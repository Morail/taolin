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
<?
class BackgroundThumberShell extends Shell {
    var $uses = array('Background');
    
    function main() {

        $total = 0;

        $bg_format = array(
                array(
                    'width' => 50,
                    'height' => 50
                )
            );

        // Importing components to be used
        App::import('Component','Thumber');
        $this->Thumber = new ThumberComponent(null);
        
        App::import('Component','PhotoUtil');
        $this->Thumber->PhotoUtil = new PhotoUtilComponent(null);
        
        //Get bacgrounds
        $bgs = $this->Background->find('all', array(
                    'fields'=>array(
                        'id','path'
                    ),
                    'recursive'=> -1)
                );

        foreach($bgs as $bg) {
            $sc = $bg['Background']['path'];

            $bg_name = substr(strrchr($sc, '/'), 1);
            $wp = substr($sc, 0, - mb_strlen($bg_name));

            if ( $wp == 'img/background/' )
                $bg_path = 'webroot/img/background/';
            else
                $bg_path = "plugins/".substr($wp, 0, - mb_strlen(strstr($wp, '/')))."/vendors".strstr($wp, '/');

            //$this->out($widget_path.$screenshot);

            if($this->Thumber->createthumb($bg_name, $bg_path, true, $bg_format, 90, false, true)){
                $this->out("Thumb for ".$bg_path.$bg_name." created");
                $total += 1;
            }
        }

        //Print out total
        if($total > 0)
            $this->out("Created $total thumb");
    }
}
?>
