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
<style type="text/css">
#loading-mask{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:20000;
    background-color:white;
}
#loading{
    position:absolute;
    left:45%;
    top:40%;
    padding:2px;
    z-index:20001;
    height:auto;
}
#loading a {
    color:#225588;
}
#loading .loading-indicator{
    background:white;
    color:#444;
    font:bold 13px tahoma,arial,helvetica;
    padding:10px;
    margin:0;
    height:auto;
}
#loading-msg {
    font: normal 10px arial,tahoma,sans-serif;
}
</style>

<div id="loading-mask" style=""></div>
<div id="loading">
    <div class="loading-indicator"><img src="img/extanim32.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>
        <?php echo "$title_for_layout ".$conf->get('Site.version'); ?> 
        <br />
        <span id="loading-msg">Loading styles and images...</span>
    </div>
</div>



<?php
if ($isdebugactive >= 1) {
    echo $html->css('/css/portal/portal.css');
    echo $html->css('/css/portal/menu.css');
    echo $html->css('/css/portal/widget-sprite.css');
    echo $html->css('/css/portal/custom.css');
    echo $html->css('/css/portal/file-upload.css');
    echo $html->css('/css/portal/colorpicker.css');
    echo $html->css('/css/portal/Ext.ux.IconCombo.css');
    echo $html->css('/js/portal/usr/Multiselect/Multiselect.css');

    // WIZARD WINDOW
    echo $html->css('/css/portal/Ext.ux.Wizard.css');
?>

<script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Loading Core API...';
</script>

<?php
    ## flush the buffers
    flush();

    echo $javascript->link('portal/override.js');
    
    echo $javascript->link('jquery/jquery.imagetool.js');
    echo $javascript->link('jquery/jquery.highlight-3.yui.js');
    echo $javascript->link('jquery/jquery-ui-1.7.2.custom.min.js');
    echo $javascript->link('jquery/jquery.timeago.js');
    echo $javascript->link('jquery/jquery.oembed.js');
    echo $javascript->link('jquery/jplayer/jquery.jplayer.min.js');
    
    echo $javascript->link('portal/usr/FileUploadField.js');
    
    echo $javascript->link('portal/tools.js');
    
    echo $javascript->link('portal/function.js');
    echo $javascript->link('portal/application.js');

    echo $javascript->link('portal/usr/RowExpander.js');
    echo $javascript->link('portal/usr/Portal.js');
    echo $javascript->link('portal/usr/PortalColumn.js');
    echo $javascript->link('portal/usr/colorpicker.js');
    echo $javascript->link('portal/usr/colorpickerfield.js');
    echo $javascript->link('portal/usr/Portlet.js');
    echo $javascript->link('portal/usr/SearchField.js');
    echo $javascript->link('portal/usr/Ext.ux.IconCombo.js');
    echo $javascript->link('portal/usr/Ext.DataView.LabelEditor.js');
    echo $javascript->link('portal/usr/Multiselect/DDView.js');
    echo $javascript->link('portal/usr/Multiselect/Multiselect.js');
    
    echo $javascript->link('portal/usr/Ext.ux.fbk.sonet.EventManager.js');
    /* WIZARD WINDOW */
    
    echo $javascript->link('portal/usr/Ext.ux.WizardHeader.js');
    echo $javascript->link('portal/usr/Ext.ux.BasicWizard.js');
    echo $javascript->link('portal/usr/Ext.ux.SlickCardLayout.js');
    //echo $javascript->link('portal/usr/ToolbarLayout.js');
    
    /* END WIZARD WINDOW */
    echo $javascript->link('portal/wizard_settings.js');

    echo $javascript->link('portal/widget/htmlincluder.js');
    echo $javascript->link('portal/widget/users.js');
    echo $javascript->link('portal/widget/events.js');
    echo $javascript->link('portal/widget/searchusers.js');
    echo $javascript->link('portal/widget/searchwiki.js');
    echo $javascript->link('portal/widget/searchpublik.js');
    echo $javascript->link('portal/widget/feedback.js');
    echo $javascript->link('portal/widget/feedreader.js');
    echo $javascript->link('portal/widget/groups.js');
    echo $javascript->link('portal/widget/iframer.js');
    echo $javascript->link('portal/widget/note.js');
    echo $javascript->link('portal/widget/google.js');
    echo $javascript->link('portal/widget/math.js');
    echo $javascript->link('portal/widget/nevede.js');
    echo $javascript->link('portal/widget/board.js');
    echo $javascript->link('portal/widget/metasearch.js');
    echo $javascript->link('portal/widget/webcamcanteen.js');
    echo $javascript->link('portal/widget/meteotrentino.js');

    echo $javascript->link('/fbk/js/gestint.js');
    echo $javascript->link('/fbk/js/childrenevent.js');

    echo $javascript->link('strophejs/strophe.js');
    echo $javascript->link('portal/jabber.js');
    echo $javascript->link('portal/jabberui.js');
    
    echo $javascript->link('portal/widget/buddylist.js');
    
    echo $javascript->link('portal/Timeline.js');
    echo $javascript->link('portal/UserPublications.js');
    echo $javascript->link('portal/UserPhotos.js');
    echo $javascript->link('portal/UserProfile.js');
    echo $javascript->link('portal/UserEditProfile.js');
    echo $javascript->link('portal/settings.js');
    echo $javascript->link('portal/westpanel.js');

    echo $javascript->link('portal/window/AddWidgetsWindow.js');
    echo $javascript->link('portal/window/ChatWindow.js');
    echo $javascript->link('portal/window/CommentWindow.js');
    echo $javascript->link('portal/window/GroupDetails.js');
    echo $javascript->link('portal/window/MapWindow.js');
    echo $javascript->link('portal/window/PhotoChooser.js');
    echo $javascript->link('portal/window/PhotoUploader.js');    
    echo $javascript->link('portal/window/SendToWindow.js');
    echo $javascript->link('portal/window/FirstLogin.js');
    echo $javascript->link('portal/window/ListHistory.js');
    echo $javascript->link('portal/window/ChatHistory.js');
  
} else {
    echo $html->css('/css/portal/application-all.css');
    ?>
    
    <script type="text/javascript">
        document.getElementById('loading-msg').innerHTML = 'Loading Core API...';
    </script>
    
    <?php
    ## flush the buffers
    flush();
    echo $javascript->link('application-all.js');
}

    ?>

<script type="text/javascript" src='http://www.google.com/jsapi?key=ABQIAAAAtll_c0IGkNAlp32iILQBxRTd0VjkC_00ZWjQD0rjYXEbT9OQ-RTUuv3bkIlJukEgAnOkNwab-7NEew' />
<script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Initializing...';
</script>

<div id="jplayer"></div>
