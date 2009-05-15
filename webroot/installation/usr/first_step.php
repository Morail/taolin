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


function first_step_main(){

  //if(!file_exists(DB_CONFIG_FILE))
  if(file_exists(DB_CONFIG_FILE))
    db_configuration_form();
  else
    print_database_config(DB_CONFIG_FILE);
  
}


function db_configuration_form(){

?>
  <div class="inner">
    <p class="first">
      Please check <a href="http://book.cakephp.org/view/40/Database-Configuration" target="_blank">CakePhp Cookbook</a> for an exhaustive explanation of how to configure correctly your database connection.</p>
    <p>You could change this settings anytime by editing file <i>database.php</i> placed under <i>./config/</i> directory.</p>
    <form action="install.php?step=1" method="POST" class="form">
      <label class="label" for="post_title">login</label>
      <input type="text" class="text_field" name="login" value="sonetdbmgr" />
      <span class="description">The username for the account</span>

      <label class="label" for="post_title">password</label>
      <input type="password" class="text_field" name="password" value="db2k9sonet!" />
      <span class="description">The password for the account</span>

      <label class="label" for="post_title">database</label>
      <input type="text" class="text_field" name="database" value="desktop_test" />
      <span class="description">The name of the database</span>

      <label class="label" for="post_title">host</label>
      <input type="text" class="text_field" name="host" value="bowie" />
      <span class="description">The database server’s hostname (or IP address)</span>

      <label class="label" for="post_title">persistent</label>
      <input type="text" class="text_field" name="persistent" />
      <span class="description">True to use a persistent connection to the database. Otherwise false</span>

      <div class="group navform" style="padding-top:20px">
        <input type="submit" class="button" value="Save" />
      </div>
    </form>
  </div>
<?
}


function print_database_config($fileName){

  $lines = file($fileName);

  notice_message("File config/database.php already exists. Please delete it before proceeding with this wizard.", 'warning');

  echo "<div class='inner'><p>";

  foreach ($lines as $line_number => $line) {
    if(substr(trim($line), 0, 2) != '/*' && substr(trim($line), 0, 2) != '*/' && substr(trim($line), 0, 1) != '*' && substr(trim($line), 0, 2) != '?>' && substr(trim($line), 0, 2) != '<?')
      echo "$line<br />";
  }

  echo "</p></div>";

}


function first_step_help(){
  ?>
    <h4><b>Step 1: Database configuration</b></h4>
    <p>Fill this form with your database connection settings.<br />More information and examples on <a href="http://book.cakephp.org/view/40/Database-Configuration" target="_blank">CakePhp Cookbook</a></p>
  <?
}

?>
