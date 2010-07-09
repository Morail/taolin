<?php
/**
  * This file is part of taolin project (http://taolin.fbk.eu)
  * Copyright (C) 2008, 2009 FBK Foundation, (http://www.fbk.eu)
  * Authors: SoNet Group (see AUTHORS.txt)
  *
  * Taolin is free software: you can redistribute it and/or modify
  * it under the terms of the GNU Affero General Public License as published by
  * the Free Software Foundation version 3 of the License.
  *
  * Taolin is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  * GNU Affero General Public License for more details.
  *
  * You should have received a copy of the GNU Affero General Public License
  * along with Taolin. If not, see <http://www.gnu.org/licenses/>.
  *
  */

uses('sanitize');

class BoardsController extends AppController {
    var $name = 'Boards';
    var $helpers = array('Html','Form','Javascript');
    var $components = array('Comment');
    var $paginate = array(
            'limit' => 5
            ,'page' => 1
            ,'conditions' => null
            ,'fields' => array('id', 'user_id', 'text', 'email', 'Board.created','expire_date','User.name','User.surname')
            ,'order' => array(
               'Board.created' => 'desc'
            )
            ,'recursive' => 1
        );

    function beforeFilter()
    {
        parent::beforeFilter();

        $this->checkSession();
        $this->san = new Sanitize();
    }


    function add() {
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';
        
        if (!empty($this->params['form']['text'])){
            
            $uid = $this->Session->read('id');

            // a quanto pare qui l'escape viene fatto automaticamente dalla $this->save()
            $data['text'] = $this->san->html($this->params['form']['text']);
            if(isset($this->params['form']['email']) && !empty($this->params['form']['email'])) $data['email'] = $this->san->html($this->params['form']['email']);
            if(isset($this->params['form']['expire_date']) && !empty($this->params['form']['expire_date'])) $data['expire_date'] = $this->params['form']['expire_date'];
            $data['user_id'] = $uid;

            if($this->Board->save($data)){;
                $response['success'] = true;
                $ads_id = $this->Board->id;
                $this->Board->addtotimeline(array("text" => $data['text']), null, 'boards-add', $uid, 'Board', $ads_id);
            } else {
                $response['success'] = false;
                $response['error']['text'] = 'Your message can not be saved';
            }
            
        } else {
            $response['success'] = false;
            $response['error']['text'] = 'Write a message, please';
        }
        $this->set('json', $response);
    }

    function getads(){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $data = $this->params['url'];

        if(!empty($data['limit'])){ 
            $limit = $data['limit'];
            $this->paginate['limit'] = $limit;
        }
        
        if(!empty($data['start'])) 
            $page = $data['start'] / $this->paginate['limit'];

        if(!empty($data['show_expired']) && ($data['show_expired'] == 1)){
            $conditions = null;
        }else{
            $today = date("Y-m-d");
            $conditions = "(expire_date >= '$today' OR expire_date IS NULL)";
            $this->paginate['conditions'] = $conditions;
        }

        if(isset($page))
            $this->paginate['page'] = $page + 1;
        
        $resboards = $this->paginate('Board');

        $totalCount = $this->Board->find('count', array('conditions' => $conditions));

        foreach($resboards as $board){
            $board['Board']['name'] = $board['User']['name'];
            $board['Board']['surname'] = $board['User']['surname'];
            
            $board['Board']['commentsCount'] = $this->Comment->getCommentCount($this->Board, $board['Board']['id']);


            $boards[] = $board['Board'];
        }

        if($boards) {
            $response['boards'] = $boards;
            $response['totalCount'] = $totalCount;
        } else {
            $response['boards'] = array(); 
            $response['totalCount'] = "0";
        }
        
        $response['success'] = true;
        
        $this->set('json', $response);

    }
 
    function deleteads($a_id){

        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $user_id = $this->Session->read('id');

        $filter = array('Board.id'=>$a_id);
        $board = $this->Board->find($filter,array('Board.user_id'),null,null);

        if(isset($board['Board']['user_id']) && ($board['Board']['user_id'] == $user_id)){
            $this->Board->delete($a_id);
            $response['success'] = true;
        }
        else {
            $response['success'] = false;
        }
    
        $this->set('json', $response);
    }   
    
    function undodeleteads($a_id){

        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $user_id = $this->Session->read('id');

        $filter = array('Board.id'=>$a_id);

        $this->Board->enableSoftDeletable('find', false);
        $board = $this->Board->find($filter,array('Board.user_id'),null,null);
        $this->Board->enableSoftDeletable('find', true);

        if(isset($board['Board']['user_id']) && ($board['Board']['user_id'] == $user_id)){
            $this->Board->undelete($a_id);
            $response['success'] = true;
        }
        else {
            $response['success'] = false;
        }
    
        $this->set('json', $response);
    }   

    function modifyads(){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';
        
        $ads_id = $this->params['form']['ads_id'];
        $value = $this->params['form']['value'];

        if(isset($ads_id) && isset($value)){
          
            if($value != null && $value!='null'){

                $data['id'] = $ads_id;
                $data['text'] = $value;

                $this->Board->save($this->san->html($data));

                $response['success'] = true;

                $response['message'] = $this->san->html($value);

                $this->Board->addtotimeline(array("text" => $this->san->html($value)), null, 'boards-modifyads', $this->Session->read('id'), 'Board', $ads_id);

            } 
            else $response['success'] = false;
        }
        else $response['success'] = false;

        $this->set('json', $response);
    }


    function addcomment(){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $user_id = $this->Session->read('id');
        
        $tpl_params['comment'] = $this->params['form']['comment'];

        $notification_data = $this->Comment->addComment($this->Board, $this->params, $user_id, $tpl_params, 'boards-add');

        if(!empty($notification_data)){

            $this->set(array(
                    'commenter' => $notification_data[0]['commenter']
                    ,'item' => 'message on the board'
                    ,'comment' => $tpl_params['comment']
                )
            );

            foreach($notification_data as $nd){
                if($nd['owner'])
                    $this->_sendMail($nd['from'], $nd['to'], $nd['subject'], $tpl_params['comment'], null, null, 'owner_comment_notification', null);
                else
                    $this->_sendMail($nd['from'], $nd['to'], $nd['subject'], $tpl_params['comment'], null, null, 'comment_notification', null);
            }

        }

        $this->set('json', array(
            'success' => TRUE
        ));
    }

    function delcomment($c_id){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';
        
        $u_id = $this->Session->read('id');

        if($this->Comment->delComment($this->Board, $c_id, $u_id)){
            $this->set('json', array(
                'success' => TRUE
            ));
        }
        else {
            $this->set('json', array(
                'success' => FALSE
            ));
        }
    }

    function getcomments($id){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $comments = Set::extract(
            $this->Comment->getComments($this->Board, $id),
            '{n}.Comment'
        );
        $msg = $this->Board->findById($id);
        $params = array();
        $params['user'] = $msg['User'];
        $params['text'] = $msg['Board']['text'];

        App::import("Model", 'Template');
        $template = new Template();
        $res = $template->findByName('boards-details');
        $tpl = $res['Template']['temp'];
        App::import('Vendor','h2o/h2o');
        App::import('Vendor','filters');

        $details = h2o($tpl, array('autoescape' => false))->render($params);

        $this->set('json', array(
            'success' => TRUE,
            'comments' => $comments,
            'details' => $details,
            'created' => $msg['Board']['created']
            )
        );
    }

}
?>
