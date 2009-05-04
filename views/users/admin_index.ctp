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
<div id="header">
<h1><a href="<? echo $this->base ?>/admin/">Taolin administration site</a></h1>
      <div id="main-navigation">
        <ul>
        <li class="first"><a href="<? echo $this->base ?>/admin/">Admin</a>
        <li class="active"><a href="<? echo $this->base ?>/admin/users/">Users</a>
        </ul>
        <div class="clear"></div>
      </div>
</div>
<div id="wrapper">
<div id="main">
<div class="block">
<div class="content">
<div class="inner">
<table class="table">
<tr>
<?php

//print headers
$headers = array('Id', 'Name', 'Surname', 'Login', 'Active');
echo '<th class="first">'.$headers[0].'</th>';
for ($i = 1; $i < count($headers); $i++){
    echo '<th>'.$headers[$i].'</th>';
}
echo '<th class="last">Actions</th>';

?>
</tr>

<?
$url = '/'.$url;

foreach ($users as $user){
    $user = $user['User'];
    echo '<tr class="odd">';
    foreach ($user as $field){
        echo "<td>$field</td>";
    }

    //activate/deactivate
    if ($user['active'])
        $a = "<a href='".$this->base."/admin/users/activate/".$user['id']."/0?r=$url'>deactivate</a>";
    else
        $a = "<a href='".$this->base."/admin/users/activate/".$user['id']."?r=$url'>activate</a>";
    echo "<td>$a</td>";

    echo '</tr>';
}
?>
</table>
</div>
</div>
</div>
</div>
</div>
