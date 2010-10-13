<?php // ex: set ts=2 softtabstop=2 shiftwidth=2: ?>
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

function second_step_main(){

  $sql_scripts_path = "../../config/sql/";
  
  $sql_scripts = array(
      "db_acl.sql"
      ,"taolin.struct.sql"
      ,"taolin.struct.post.sql"
      ,"taolin.history.sql"
      ,"taolin.configs.sql"
      ,"taolin.data.sql"
    );
    
  ?>
    <h2 class="title">Step 2: Creating database structure</h2>
    <div class='inner'>
  <?

  $db_config = $_POST['db'];

  // if the user chose to import demo data, process that file as well
  if(isset($_POST['import_demo_data']))
    $sql_scripts[] = "taolin.data.demo.sql";

  $db = database_connection($db_config['host'], $db_config['database'], $db_config['port'], $db_config['login'], $db_config['password']);
  
  if($db){

    echo "<p>Processing SQL scripts in order to create database structure. Once finished, click on the link placed at the bottom of the page in order to go to the next step.</p>";

    echo "<div style='height:400px;overflow-y:auto;border: 1px solid; background: lightGray;'>";

    foreach($sql_scripts as $sql_script){
      echo "<h3>Processing file $sql_script</h3>";
      execute_sql_script($db, $sql_scripts_path.$sql_script);
    }
    echo "</div>";
    notice_message("<b>Database structure created</b>", "notice");

    ?>
        <hr />
        <div id='second-step-bottom'>
          <div class='inner'>
            <form method="POST" class="form" action="install.php?step=2" >
              <div class="group navform" style="padding-top:20px">
                <input type="submit" class="button" value="Next step" />  
              </div>
            </form>
          </div>
        </div>
      </div> 
    <?
  }
  else {
      notice_message("<b>ERROR! Can not connect to the database <i>$dbname</i> on host <i>$host</i></b>", "error");
        
      echo '<h4><b>Uops! Unfortunately something went wrong and connection failed! What can you do now?</b></h4><ul style="padding-left:20px;"><li><a href="install.php">Go back to step 1</a> and re-configure your database properly</li><li>If this error persists, check your database (users, grants..) or submit an issue to Taolin on github.</li></ul></div>';
  }

}


function second_step_help(){
  ?>
    <h4><b>Step 2: Creating database structure</b></h4>
    <p>Processing SQL scripts in order to create database structure. Once finished, click on the link placed at the <a href="#second-step-bottom">bottom of the page</a> to go to the next step.</p>
  <?
}
?>
