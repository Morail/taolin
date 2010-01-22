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


/**
  * Ext.ux.fbk.sonet.WebcamCantinery Extension Class
  *
  * @author  Maurizio Napolitano <napo@fbk.eu>
  * @version 1.0
  * @class Ext.ux.fbk.sonet.WebcamCantinery
  * <p>Widget to show the picture snap from the cantinery<br/>
  * The snapshots are created with a script managed with a crontab (from monday to friday, from 11:55 to 14:03) and a php script</p>
  * <pre><code>
    this is the json code passed
    {"webcam":{"sec4firstshot":63104,"duration":7680,"interval":30,"servicemessage":"Service available from 12 to 14 on working days"}}
    
    Where:
        sec4firstshot -> the waiting seconds for the first call
        duration -> the duration time (in secs) of the service
        interval -> time (in secs) between the snapshots
        servicemessage -> message to show where the service is not available
    </code></pre>
*/

WebcamCanteen = Ext.extend(Ext.Panel, {
    border:true
    ,autoScroll:true
    ,iconCls:'webcam'
    ,frame:true
    ,layout: 'fit'
    ,collapsible:false
    ,hideCollapseTool:false
    ,initComponent: function(){
        var config = {
            items: [{
                html: '<div id="webcam_' + this.getId() + '"><img src="'+Ext.BLANK_IMAGE_URL+'" style="display:none"><p></p></div>',
                display: 'none',
                autoHeight: true,
                border: true 
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        WebcamCanteen.superclass.initComponent.apply(this, arguments);
    }
    ,onRender: function(){ 
        var webcamid = this.getId();
        Ext.Ajax.request({
            url: 'webcams/gettime',
            scope: this,
            success: function (result, request) {
                var data = Ext.util.JSON.decode(result.responseText).webcam;
                Ext.apply(this, data);

                $('#webcam_'+ webcamid +'> p')
                    .text(this.servicemessage);

                this.reloadTask = {
                    run: function(){
                        var dateNow = new Date().getTime();
                        var img1 = "webcams/getsnapshot?v=" + dateNow;
                        if(task.taskRunCount < (this.duration / this.interval)){
                            $('#webcam_' + webcamid)
                                .find('img')
                                    .attr("src",img1)
                                    .show()
                                .end()
                                .find('p')
                                    .hide();
                        }
                        else {
                            $('#webcam_' + webcamid)
                                .find('img')
                                    .hide()
                                .end()
                                .find('p')
                                    .show();
                            Ext.getCmp(this.portlet_id).updateWidget();
                        }
                    }
                    ,interval: this.interval * 1000
                    ,scope: this
                    ,duration: this.duration * 1000
                };
                this.dTask = new Ext.util.DelayedTask(
                    function(){
                        Ext.TaskMgr.start(this.reloadTask);
                    }
                    ,this
                );

                this.dTask.delay(this.sec4firstshot * 1000);
            }
        });
        WebcamCanteen.superclass.onRender.apply(this, arguments);
    }
});
Ext.reg('webcam', WebcamCanteen);
