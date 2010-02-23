/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
  * Ext.ux.fbk.sonet.MeteoTrentino Extension Class
  *
  * @author  Marco Frassoni, Maurizio Napolitano & Davide Setti
  * @version 1.0
  * @class Ext.ux.fbk.sonet.MeteoTrentino
  * <p>MeteoTrentino weather forecast</p>
  * <pre><code>
    This is a example of the json
    </code></pre>
*/


MeteoTrentino = function(conf, panel_conf){
    Ext.apply(this, panel_conf);

    var l = conf.selected;

    if(!(l in conf.lang))
        l = conf.defaultValue;

    var url = conf.lang[l].url;
    var xslt = conf.lang[l].xslt_file;

    this.html = '';

    this.loadForecast = function(){
        
        var p = this;

        Ext.Ajax.request({
            url : 'xslt-applier.php',
            params: {'url': url, 'xslt': xslt},
            method: 'POST',
            success: function(result, request){
                p.html = result.responseText;
                p.renderForecast();
            },
            failure: function(result, request){
                $('#'+p.getId()+'-forecast-overview').html('<div>').addClass('error-msg').text('Uh oh! Something apparently went wrong, please apoligize us and send us a feedback!');
            }
        });
    };

    this.renderForecast = function(){

        var ov = $('#' +this.getId()+'-forecast-overview');
        var dv = $('#' +this.getId()+'-forecast-detailedview');

        if(this.html === null || this.html === '')
            ov.html('<div>').addClass('error-msg').text('Uh oh! Something apparently went wrong, please apoligize us and send us a feedback!');

        var doc = $("<div>").html(this.html);

        ov.html(doc.find('#meteo_sintesi'));

        var f = doc.find('.meteo_forecast');
        
        dv.html(f);

        this.visualize();
    };

    this.visualize = function(day){

        var ov = $('#' +this.getId()+'-forecast-overview');
        var dv = $('#' +this.getId()+'-forecast-detailedview');
        var lk = $('#' +this.getId()+'-forecast-links');

        var w_id = this.getId();

        var link = 'Ext.getCmp(\''+w_id+'\').visualize(\'{0}\')';

        if(this.html === null || this.html === '')
            ov.html('').html('<div>').addClass('error-msg').text('Uh oh! Something apparently went wrong, please apoligize us and send us a feedback!');

        lk.html('');

        if (typeof day == "undefined") {
            day = "today";
        }

        dv.children().each(function(){
            var id = $(this).attr('id');
            var label = $(this).attr('label');
            if(id == day){

                lk.append(
                    $('<span>')
                    .text(label)
                );

                $(this).show();
            } else {

                lk.append(
                    $('<span>')
                    .addClass('a')
                    .click(function(){
                        Ext.getCmp(w_id).visualize(id); 
                    })
                    .text(label)
                );

                $(this).hide();
            }
        });

        lk.children().css({'padding' : '10px', 'font-size' : '13px'});
    };

    MeteoTrentino.superclass.constructor.call(this, {
        autoHeight: true
        ,autoWidth: true
        ,defaults: { 
            autoScroll: true 
        }
        ,items: [{
            html: 
                '<div id ="'+this.getId()+'-forecast">'
                    +'<div style="margin: 15px 0; text-align:center;"><span id="'+this.getId()+'-forecast-links" class="confirm-msg"></span></div>'
                    +'<div id="'+this.getId()+'-forecast-overview" style="padding:5px 20px;"></div>' 
                    +'<div id="'+this.getId()+'-forecast-detailedview" style="padding:5px;"></div>'
                    +'<div style="float:right;padding:10px;font-weight:bold;"><span class="a" style="margin: 10px;" onclick="Ext.getCmp(\''+this.id+'\').ownerCt.updateWidget()">Reload</span><span style="margin: 10px;" class="a" onclick="Ext.getCmp(\''+this.id+'\').ownerCt.showConf()">Change language</span></div>'
                +'</div>'
            ,border: false
            ,autoHeight: true
        }]
        ,listeners: {
            render: function(){
                this.loadForecast();
            }
        }
    });
};
Ext.extend(MeteoTrentino, Ext.Panel);
