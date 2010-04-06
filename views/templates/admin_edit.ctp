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

<style type="text/css">
  .CodeMirror-line-numbers {
    width: 2.2em;
    color: #aaa;
    background-color: #eee;
    text-align: right;
    padding-right: .3em;
    font-size: 10pt;
    font-family: monospace;
    padding-top: .4em;
  }
.CodeMirror-wrapping {
    border: 1px solid #CFCFCF !important;
}

</style>


<script type="text/javascript" charset="utf-8" src="<? echo $this->base ?>/admin-media/codemirror/js/codemirror.js"></script> 

<div id="wrapper">
  <div id="main">
    <div class="block">
      <div class="content">
        <div class="inner">
          <h2 class="title">Edit template</h2>
          <br />
          <? echo $form->create('Template', array('class' => 'form')); ?>
          <? echo $form->input('name', $opts_tf); ?>
          <? echo $form->input('temp', $opts_ta); ?>
          <? echo $form->input('short_temp', $opts_ta); ?>
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

  <div id="sidebar">
    <div class="block">
      <h3>Help</h3>
      <div class="content">
        <p>In this page you can modify existing templates. If you need more functionalities please submit an Issue on <a href="http://github/vad/taolin/issues">Github</a></p>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  var cmConf = {
    height: "100px",
    parserfile: "parsexml.js",
    stylesheet: "<? echo $this->base ?>/admin-media/codemirror/css/xmlcolors.css",
    path: "<? echo $this->base ?>/admin-media/codemirror/js/",
    continuousScanning: 500,
    lineNumbers: false,
  };

  // create a code mirror editor and clone configuration object (otherwise codemirror duplicates the first editor in the second one)
  var editorTemp = CodeMirror.fromTextArea('TemplateTemp', $.extend(true, {}, cmConf));
  var editorShortTemp = CodeMirror.fromTextArea('TemplateShortTemp', $.extend(true, {}, cmConf));
</script>


