<!-- ex: set ts=2 softtabstop=2 shiftwidth=2: -->
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

  $opts = array(
    'label' => array('class' => 'label'),
    'div' => array('class' => 'group')
  );
  $opts_ta = array_merge($opts, array('class' => 'text_area', 'type' => 'textarea'));
  $opts_tf = array_merge($opts, array('class' => 'text_field'));
  $opts_tc = array_merge($opts, array('label' => array('class' => 'checkbox'), 'class' => 'checkbox', 'type' => 'checkbox'));
  $opts_tcs = array_merge($opts, array('label' => array('class' => 'label', 'style' => 'display: inline-block'), 'class' => 'checkbox', 'type' => 'checkbox'));

?>

<div id="wrapper">
  <div id="main">
    <div class="block">
      <div class="secondary-navigation">
        <ul><li class="first"><a href="<? echo $this->base.DS."admin/templates" ?>">Templates list</a></li></ul>
        <ul><li class="active"><a href='#top'>New template</a></li></ul>
        <div class="clear" />
      </div>
      <div class="content">
        <div class="inner">
          <h2 class="title">Create new template</h2>
          <br />
          <? echo $form->create('Template', array('class' => 'form')); ?>
          <? echo $form->input('name', $opts_tf); ?>
          <? echo $form->input('temp', $opts_ta); ?>
          <? echo $form->input('icon', $opts_tf); ?>
          <? echo $form->input('is_unique', $opts_tcs); ?>
          <br />
          <? echo $form->submit('Save →', array('class' => 'button','div'=>false)); ?>
          or
          <a href="<? echo $this->base."/admin/templates" ?>">Cancel</a>
          <? //echo $form->end('Save'); ?>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="sidebar">
  <div class="block">
    <h3>Help</h3>
    <div class="content">
      <p>In this page you can create a new template. If you have any problem please submit an Issue on <a href="http://github/vad/taolin/issues">Github</a></p>
    </div>
  </div>
</div>
