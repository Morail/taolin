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
?>
<?php

uses('sanitize');

class BoardsController extends AppController {
    var $name = 'Boards';
    var $helpers = array('Html','Form','Javascript');
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
            // a quanto pare qui l'escape viene fatto automaticamente dalla $this->save()
            $data['text'] = $this->san->html($this->params['form']['text']);
            if(isset($this->params['form']['email']) && !empty($this->params['form']['email'])) $data['email'] = $this->params['form']['email'];
            if(isset($this->params['form']['expire_date']) && !empty($this->params['form']['expire_date'])) $data['expire_date'] = $this->params['form']['expire_date'];
            $data['user_id'] = $this->Session->read('id');

            $this->Board->save($data);
            
            $response['success'] = true;
              
            $ads_id = $this->Board->id;

            $this->addtotimeline(array("text" => $data['text']), null, null, null, 'Board', $ads_id);
            
        } else {
            $response['success'] = false;
            $response['errors']['text'] = 'Write a message, please';
        }
        $this->set('json', $response);
    }

    function getads(){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        if(!empty($this->params['form']['limit'])) 
            $limit = $this->params['form']['limit'];
            $this->paginate['limit'] = $limit;
        
        if(!empty($this->params['form']['start'])) 
            $page = $this->params['form']['start'] / $limit;

        if(!empty($this->params['form']['show_expired']) && ($this->params['form']['show_expired'] == 1)){
            $conditions = null;
        }else{
            $today = date("Y-m-d");
            $conditions = "(expire_date >= '$today' OR expire_date IS NULL)";
            $this->paginate['conditions'] = $conditions;
        }

        if($page)
            $this->paginate['page'] = $page + 1;
        
        $resboards = $this->paginate('Board');

        $totalCount = $this->Board->find('count', array('conditions' => $conditions));

        foreach($resboards as $board){
            $board['Board']['name'] = $board['User']['name'];
            $board['Board']['surname'] = $board['User']['surname'];
            $board['Board']['comments_count'] = count($this->getmessagecomments($board['Board']['id']));
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
    
                $this->Board->save($data);

                $response['success'] = true; 

                $this->addtotimeline(array("text" => $value), null, null, null, 'Board', $ads_id);

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
        
        $b_id = $this->params['form']['foreign_id'];
        $text = $this->params['form']['comment'];

        $comment = array('Comment' => array(
            'body' => $text,
            'name' => $user_id,
            'email' => 'abc@example.com'
        ));

        $this->Board->createComment($b_id, $comment);

        $this->set('json', array(
            'success' => TRUE
        ));
    }
    
    function getcomments(){
        Configure::write('debug', '0');     //turn debugging off; debugging breaks ajax
        $this->layout = 'ajax';

        $b_id = $this->params['form']['foreign_id'];
        $comments = Set::extract($this->getmessagecomments($b_id), '{n}.Comment');
        
        $this->set('json', array(
            'success' => TRUE,
            'comments' => $comments)
        );
    }

    // Retrieve comments for a single message with id = $b_id
    function getmessagecomments($b_id){
        $filter = array('Board.id' => $b_id);
        $boardmsg = $this->Board->find('first', array(
            'conditions' => $filter,
            'recursive' => FALSE
        ));
        $this->Board->create($boardmsg);

        $comments = $this->Board->getComments(array(
            'options' => array(
                'conditions' => array(
                    'Comment.status' => 'pending'
                )
            )
        ));

        return $comments;
    }

}
?>
