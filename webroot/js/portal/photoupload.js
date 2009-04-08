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

PhotoUpload = function(){

    PhotoUpload.superclass.constructor.call(this, {
        id: 'file-upload',
        fileUpload: true,
        autoWidth: true,
        frame: true,
        autoHeight: true,
        bodyStyle: 'padding: 10px 10px 0 10px;',
        labelWidth: 70,
        monitorValid: true,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            html: '<div>Please upload a photo in which your face is visible, so that colleagues can recognize you when they meet you!</div>',
            style: 'padding:0px 0px 20px 75px;'
        },{
            xtype: 'textfield',
            fieldLabel: 'Name',
            id: 'file-name',
            /* Only alphanumeric admitted */
            maskRe: /[a-zA-Z0-9 ]/,
            name: 'name',
            maxLength: 100
        },{
            xtype: 'fileuploadfield',
            id: 'form-file',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'file',
            buttonCfg: {
                text: '',
                iconCls: 'upload-icon'
            },
            listeners: {
                'fileselected': function(fb, v){
                    if((Ext.getCmp('file-name').getValue() === null) || (Ext.getCmp('file-name').getValue() == "")) {
                        var index = 0;
                        if( v.lastIndexOf('\\') > -1 ) index = v.lastIndexOf('\\') + 1;
                        else if( v.lastIndexOf('/') > -1 ) index =  v.lastIndexOf('/') + 1;
                        Ext.getCmp('file-name').setValue(v.substring(index, v.lastIndexOf('.')));
                    }
                }
            }
        },{
            fieldLabel: 'Description',
            name: 'caption',
			xtype: 'textarea',
			grow: true,
            allowBlank: 'true'
        },{
            html: '<br />' 
        },{
            xtype: 'checkbox',
            boxLabel: ' Set this as your default photo',
            checked: false,
            labelSeparator: '',
            name: 'default_photo',
            listeners: {
                'check': function(cb, checked){
                    /* Another bad hack, the checkbox is found by the position it occupies in 
                       the array of items of this form */
                    cb.findParentByType().form.items.items['4'].setDisabled(checked);
                }
            }
        },{
            xtype: 'checkbox',
            boxLabel: ' Hide this photo to other users (keep it private!)',
            checked: false,
            labelSeparator: '',
            name: 'is_hidden',
            listeners: {
                'check': function(cb, checked){
                    /* Another bad hack, the checkbox is found by the position it occupies in 
                       the array of items of this form */
                    cb.findParentByType().form.items.items['3'].setDisabled(checked);
                }
            }

        }],
        buttons: [{
            text: 'Save',
            tooltip: 'To enable saving your photo, both file and file name must be filled',
            handler: function(){
                if(this.getForm().isValid()){
                    this.form.submit({
                        url: 'photos/uploadphoto',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o){
                            Ext.example.msg('Success', o.result.message);
                            if(fp.findField('default_photo').getValue()){
                                var url = 'img/'+window.config.imgpath+o.result.url;
                                Ext.getCmp('photo-chooser').setDefaultPhoto(null, url);
                            }
                            Ext.getCmp('upload-window').close();
                            Ext.getCmp('photo-chooser').store.load();
                            if(Ext.getCmp('wp-photos-tab') && Ext.getCmp('wp-photos-tab').store && (window.thisId === westPanel.showedUser.id))
                                Ext.getCmp('wp-photos-tab').store.load({params: {id: window.thisId}});
                            reloadTimeline();
                        },
                        failure: function(fp, o){
                            Ext.example.msg('Failure!', 'We are sorry - Problem found in data transmission.<br /><br />'+ o.result.message, 15);
                            Ext.getCmp('upload-window').close();
                        }
                    });
                }
            },   
            scope:this,
            formBind:true
        },/*{
            text: 'Reset',
            handler: function(){
                this.getForm().reset();
            },
           scope: this 
        },*/{
            text: 'Close',
            handler: function(){ 
                Ext.getCmp('upload-window').close(); 
            },
            scope: this
        }]
    });
};

Ext.extend(PhotoUpload, Ext.form.FormPanel); 
