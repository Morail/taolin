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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Taolin. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
  * Ext.ux.fbk.sonet.UserProfile
  *
  * @author  Marco Frassoni and Davide Setti
  * @class Ext.ux.fbk.sonet.UserProfile
  * #@extends Ext.Panel
  * Shows a user's profile
  *
  */
Ext.ns( 'Ext.ux.fbk.sonet' );

Ext.ux.fbk.sonet.UserProfile = Ext.extend(Ext.Panel, {
    title:'User profile',
    autoScroll:true,
    border:false,
    collapsible:true,
    hideCollapseTool:true,
    frame:true,
    iconCls:'user_info',
    tools: toolsnotclose
    ,initComponent: function(){
        var config = {
            items: [{
                border: false,
                html:
                    '<table><tr">' +
                        '<td style="padding-right:10px;">' + 
                            '<div class="user-photo-container" onmouseout="if (mouseLeaves(this, event)) {$(\'#edit-photo-button\').fadeOut(\'fast\');}" onmouseover="if (Ext.getCmp(\'west-panel\').showTools){$(\'#edit-photo-button\').fadeIn(\'fast\')}">' +
                                '<img id="user_photo" class="ante no-hover" style="padding:1px;margin:5px;"/>' +
                                '<div id="edit-photo-button" onclick="openImageChooser();" style="background: #DDE4FF;-moz-border-radius:3px;">' +
                                    '<span class="u-hover">Change photo</span>' +
                                    '<img class="sprited image-edit l18" />' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td>' +
                            '<div id="user_info"></div>' +
                        '</td>' +
                    '</tr></table>' + 
                    '<div id="user-profile-edit-div" class="edit_div border_radius_5px" style="margin: 15px 30px; !important">' +
                        '<div onclick="expandSettingsPanel();">' +
                            '<span class="sprited user-edit l18 u-hover">Edit your profile</span>' +
                        '</div>' +
                        '<div onclick="openImageChooser();">' +
                            '<span class="sprited image-edit l18 u-hover">Edit your photos</span>' +
                        '</div>' +
                        '<div onclick="(new Ext.ux.fbk.sonet.MapWindow({logparams: \'' + Ext.util.Format.htmlEncode('{"source": "user profile", "user_id":""}') + '\'})).show()" style="padding:1px 0;">' +
                           '<span class="sprited map-edit l18 u-hover">Edit workplace</span>' + 
                        '</div>' +
                    '</div>'  
            },{           
                xtype:'tabpanel',
                border: false,
                tabWidth:115,
                enableTabScroll:true,
                autoWidth: true,
                autoHeight: true,
                activeTab: 0,
                layoutOnTabChange:true,
                plain:true,
                frame:false,
                defaults: {
                    autoScroll:true
                },
                items: [{
                        title: 'Information',
                        html: '<div id="user_text"></div>',
                        autoHeight: true
                    },{
                        title: 'Timeline'
                        ,header: false
                        ,xtype: 'timeline'
                        ,autoHeight: true
                        ,iconCls: null
                        ,bodyStyle: 'padding-right:15px; border: 0 none;'
                        ,id: 'user_info_timeline'
                        ,autoLoad: false
                        ,frame: false
                        ,listeners:{
                            activate: function(timeline){
                                if(westPanel.showedUser.id != timeline.view.store.baseParams.u_id) {
                                    timeline.view.store.setBaseParam('u_id', westPanel.showedUser.id);
                                    timeline.view.store.reload();
                                }
                            }
                        }
                    },{
                        xtype:'userpublications'
                        ,id:'wp-publik-tab'
                    },{
                        xtype:'userphotos'
                        ,id:'wp-photos-tab'
                    }]
            }]

        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
                 
        Ext.ux.fbk.sonet.UserProfile.superclass.initComponent.apply(this, arguments);

    }
});

Ext.reg('userprofile', Ext.ux.fbk.sonet.UserProfile);
