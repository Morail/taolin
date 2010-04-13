// ex: set ts=2 softtabstop=2 shiftwidth=2: 
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
  * Ext.ux.fbk.sonet.BuddyList Extension Class
  *
  * @author  Davide Setti
  * @version 1.0
  * @class Ext.ux.fbk.sonet.BuddyList
  * <p>This widget show the user connected to the jabber server</p>
*/

var fancyPresenceDict = {
  dnd: 'do not disturb'
};

var roster = {
  // Online buddies
  online: [],
  // Full roster
  roster: [],
  setPresence: function (jid, presence, status, type) {
    var fm = Ext.util.Format
      ,online = this.online;

    if (!this.roster.length){
      return;
    }

    // this is a dirty way to put ME inside the buddylist
    // the problem is that ME is not sent in the roster, but only as presence/status
    if (jid == jabber.myJid){
      try {
        var x, b, i;
        for (i=0; x = this.roster[i++];) {
          if (x.jid == jid)
            throw "JidAlreadyPresentException";
        }
        for (i=0; x = this.online[i++];) {
          if (x.jid == jid)
            throw "JidAlreadyPresentException";
        }
        // if we're here, Me is not present in roster.roster or roster.online
        b = new Buddy(jid, '', '', 'Me', presence, status, type);
        this.roster.push(b);
      } catch (e) {}
    }

    // If the buddy comes online, move them to 'online'
    if (type != 'unavailable') {
      for (var i=0, x; x = this.roster[i++];) {
        if (x.jid == jid) {
          this.online.push(x);
          this.roster.remove(x);
          break;
        }
      }
    }
    var sBulletPresence = (type === 'unavailable') ? 'unavailable' : presence
      ,sStyleBg = 'url(js/portal/shared/icons/fam/'+ hBullets[sBulletPresence] +') left no-repeat'
      ,css = Ext.util.CSS;

    //TODO: THIS IS REALLY SLOW! TAKES ~0.05s ON A CORE2DUO AND FF3.6
    var sCssClass = 'user-' + (jid.split('@'))[0]
      ,rule = 'body .'+ sCssClass; 

    if (!css.updateRule(rule, 'background', sStyleBg)) { // if no cssClass has been found, create it
      var s = rule +" {\n}";
      css.createStyleSheet(s, rule);
      css.refreshCache();

      // now we need to get the class, so we can change its style
      css.updateRule(rule, 'background', sStyleBg);
    }

    for (var i=online.length, buddy, fancyPresence; buddy = online[--i];) {
      //buddy = online[i];
      if (buddy.jid === jid) {
        fancyPresence = presence;
        if (presence in fancyPresenceDict)
          fancyPresence = fancyPresenceDict[presence];

        Ext.apply(buddy, {
          presence: presence
          ,fancyPresence: fancyPresence
          ,status: fm.htmlEncode(status)
          ,fancyStatus: fm.htmlEncode(status).smilize().urlize()
          ,type: type
        });
      
        // If the buddy goes offline, remove from online list
        if (type === 'unavailable') {
          online.remove(buddy);
          this.roster.push(buddy);
        }
        break;
      }
    }
    rosterStore.load();
  },
  clear: function () {
    this.online = [];
    this.roster = [];
    rosterStore.load();
  }
};

rosterStore = new Ext.data.GroupingStore({
  id: 'rosterStore',
  proxy: new Ext.data.MemoryProxy(roster),
  reader: new Ext.data.JsonReader({
    root: 'online'
    },[
      {name: 'jid'},
      {name: 'subscription'},
      {name: 'name'},
      {name: 'group'},
      {name: 'presence'},
      {name: 'status'},
      {name: 'fancyStatus'},
      {name: 'fancyPresence'}    
  ]),
  sortInfo: {field: 'jid', direction: "ASC"},
  groupField: 'group'
});
/*
rosterStore.on('loadexception', function(proxy, store, response, e) {
    console.log('loadexception: ' + e.message);
});
*/

BuddyList = function(conf, panel_conf) {
  Ext.apply(this, panel_conf);

  this.conf = conf;

  BuddyList.superclass.constructor.call(this, {
      id:'buddylist',
      collapsible: true,
      autoHeight: true,
      header: false,
      buddyTpl: new Ext.XTemplate(
          '<table style="width:100%"><tr>'
              ,'<td style="vertical-align:middle;">'
                  ,'<div class="buddylistjid buddyliststate{presence}" qtip="{status}">{jid}'
                      ,'<tpl if="presence">'
                          ,'<span class="buddylistmessage" style="margin-left:10px;">{fancyPresence}</span>'
                      ,'</tpl>'
                  ,'</div>'
                  ,'<tpl if="status">'
                      ,'<div class="buddylistmessage" qtip="{status}" style="padding-right:2px;">'
                          ,'{fancyStatus}'
                      ,'</div>'
                  ,'</tpl>'
              ,'</td>'
              ,'<tpl if="showPhoto">'
              ,'<td style="width:40px;text-align:center;">'
                  ,'<img src="photos/getphotofromuserlogin/{[values.jid.split(\'@\')[0]]}/40/40" />'
              ,'</td>'
              ,'</tpl>'
          ,'</tr></table>'
          ,{
              compiled: true
              ,disableFormats: true
          }
      ),
      tbar: [new Ext.ux.IconCombo({
          id: 'presence',
          //name: 'presence',                  
          width: 100,
          listWidth: 130,
          store: new Ext.data.SimpleStore({
            fields: ['presence', 'readablePresence', 'iconClass'],
            data: [
              ['', 'Available', 'buddyliststate']
              ,['away', 'Away', 'buddyliststateaway']
              ,['dnd', 'Do not disturb', 'buddyliststatednd']
              ,['invisible', 'Invisible', 'buddyliststateinvisible']
              //,['chat', 'Chatty']
              //,['unavailable', 'Offline']
            ]
          }),
          panel: this,
          value:get(conf, 'presence', ''),
          displayField: 'readablePresence',
          valueField: 'presence',
          iconClsField: 'iconClass',
          mode: 'local',
          forceSelection: true,
          triggerAction: 'all',
          editable: false,
          listeners: {
            render: function (combo) {
                combo.initFlags();
                //combo.setValue(combo.store.collect('presence', true)[0]);
            },
            select: function (combo) {
              var status = Ext.getCmp('status').getValue()
                ,presence = combo.getValue()
                ,type;
              
              //store in DB
              this.panel.setPref('presence', presence);
              
              //this XEP isn't very linear...
              if (presence == 'invisible') {
                presence = '';
                type = 'invisible';
              }

              jabber.setPresence(combo.getValue(), status, type);
            }
          }
        }), '&nbsp;',
        new Ext.form.ComboBox({
          id: 'status'
          ,emptyText: 'Set status message'
          ,store: new Ext.data.SimpleStore({
            fields: ['status']
            ,data: [[conf.status]] // TODO: Change this in an array
          })
          ,displayField: 'status'
          ,value: conf.status
          ,panel: this
          ,mode: 'local'
          ,width: 145
          ,queryDelay: 500
          ,hideLabel: true
          ,triggerAction: 'all'
          ,cls:'buddylist-status-field'
          ,focusClass:'buddylist-status-focus'
          ,recordType:Ext.data.Record.create(['status'])
          ,loseFocus: function () {
             Ext.getCmp('presence').focus();
             this.fireEvent("blur", this);
          }
          //,enableKeyEvents:true
          // this should go into listeners.keyup, but there are problems in Ext 2.2
          ,onKeyUp: function (e) { 
              this.collapse();
              if (e.getKey() == Ext.EventObject.ENTER) {
                var status = Ext.getCmp('status')
                    ,sPresence = Ext.getCmp('presence').getValue()
                    ,sStatus = status.getEl().dom.value;
                
                rec = new status.recordType({status: sStatus});
                Ext.getCmp('status').store.add(rec);
                
                //store in DB
                this.panel.setPref('status', sStatus, reloadTimeline);

                //change jabber status
                jabber.setPresence(sPresence, sStatus);
                this.loseFocus();
              }
              e.stopEvent();
          }
          ,listeners: {
            blur: function (t) {
                if(!Ext.isOpera && t.focusClass){ // don't touch in Opera
                    t.el.removeClass(t.focusClass);
                }
            }
            ,select: function (combo, record, index) { //change status from drop down menu
                var presence = Ext.getCmp('presence').getValue()
                  ,status = record.get('status');
                
                //store in DB
                combo.panel.setPref('status', status, reloadTimeline);
                                       
                //change jabber status
                jabber.setPresence(presence, status);
            }
            ,render: function(t){

                var presence, status, type
                  ,cPresence = Ext.getCmp('presence').value;
                
                if (cPresence == 'invisible'){
                  presence = '';
                  type = 'invisible';
                } else {
                  presence = cPresence;
                }
                
                status = t.value ? t.value : '';

                jabberui.init(presence, status, type);
            }
            ,beforedestroy: function(t){
                jabber.quit();
            }
          }
      })],
      listeners: {
        resize : function(panel, panelWidth, panelHeight){ 
          panel.gridPanel.setWidth(panelWidth);
        } 
      },
      items: [
        new Ext.grid.GridPanel({
          store: rosterStore,
          autoHeight: true,
          draggable: false,
          hideHeaders: true,
          parent: this,
          autoExpandColumn: 'jid',
          autoExpandMax: 10000,
          columns: [{
            id: 'jid',
            dataIndex: 'jid',
            buddyList: this,
            myIndex: 0,
            renderer: function (value, p, record) {
              var bl = this.buddyList
                ,data = record.data;
                
              data.showPhoto = bl.conf.showPhoto;
              return bl.buddyTpl.applyTemplate(data);
            }},
            {dataIndex: 'group', hidden: true},
            {dataIndex: 'presence', hidden: true},
            {dataIndex: 'subscription', hidden: true},
            {dataIndex: 'status', hidden: true},
            {dataIndex: 'fancyStatus', hidden: true}
          ],
          view: new Ext.grid.GroupingView({
            scrollOffset:2,
            showGroupName: false,
            rowSelectorDepth: 12,
            groupTextTpl: '{text} ({values.rs.length:plural("Buddy", "Buddies")})',
            deferEmptyText: false,
            emptyText: 'Loading...'
          }),
          cls: 'blist-grid',
          listeners: {
            rowclick: function() {
              var buddy = this.getSelectionModel().getSelected().data;
              if(jabber.myJid != buddy.jid)
                jabberui.createNewChatWindow(buddy.jid);
              getIdFromJidNode(buddy.jid);
            },
            resize : {
              fn: function(panel, panelWidth, panelHeight){ 
                var presence = Ext.getCmp('presence')
                  ,status = Ext.getCmp('status')
                  ,width = panelWidth - (presence.width + 20); // Status's width
                if(width) // Check whether "width" is not NaN but a real number
                  status.setWidth(width);
              }, 
              scope: this
            }
          }
        })]
  });
  
  var gp = this.items.first();
  this.gridPanel = gp;
  gp.store.on('load', function() {
    if (this.view) {
      Ext.getCmp('buddylist').gridPanel.view.emptyText = 'Nobody online or there has been problems connecting to the server.<br/><br/>Click <span class="a" onclick="resetJabberConnection()"><b>here</b></span> to try again. If you changed your password recently, please logout and login again with the new password.';
    }
  }, gp);/**/
};

Ext.extend(BuddyList, Ext.Panel);

//Ext.reg('buddylist', BuddyList);
