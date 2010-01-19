/*
 * Chat Window Class
 */

/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
  * Ext.ux.fbk.sonet.ChatWindow Extension Class
  *
  * @author  Marco Frassoni and Davide Setti and Yakalope
  * @class Ext.ux.fbk.sonet.ChatWindow
  * <p>This window chat </p>
  * <pre><code>
    This is a example of the json
    </code></pre>
*/

ChatWindow = Ext.extend(Ext.Window, {
    
    /* Construction Time Variables */
    
    width: 250,
    height: 250,
    iconCls: "chatwindowicon",
    //constrain: true,
    border:false,
    collapsible:true,
    draggable:false,
    resizable:false,
    animCollapse:false,
    constrain:true,
    closeAction: 'hide',
    layout:'anchor',
    cls:'comment-icon',
 
    /* Runtime Variables */
   
    focus: function() {
        /* focus the area where the user write instead of the entire window*/
        jabberui.focused = this.getId();
        Ext.getCmp('msgarea'+this.getId()).focus('', 5);
    },

    sendHandler: function(key,event) {
        var msgArea = this.items.last();
        var chatMessage = msgArea.getValue();
        if (chatMessage !== '' && chatMessage !== '\n') {
            this.addMsg(this.user, chatMessage);
            msgArea.setValue('');
            //Send Message to Jabber Connection
            jabber.sendMsg(this.getId(), chatMessage);
        }
        msgArea.focus();
        event.stopEvent();
    },
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                id:'msgarea'+this.getId(),
                layout:'fit',
                height:50,
                split:true,
                hideBorders:false,
                border:false,
                xtype:'textarea',
                hideLabel:true,
                maxLength:4000,
                maxLengthText:'The maximum length text for this field is 4000',
                style:'overflow: auto;',
                anchor:'100%',
                listeners: {
                    focus: function(t) {
                        Ext.getCmp(t.getId().substring(7)).setActive(true);
                    },
                    blur: function(t) {
                        Ext.getCmp(t.getId().substring(7)).setActive();
                    }
                }
            }],
            keys: [{
                key:13,
                fn:this.sendHandler,
                scope:this
            },{
                key:Ext.EventObject.TAB,
                fn:jabberui.focusNext,
                scope:jabberui
            }
            ]
        });
        ChatWindow.superclass.initComponent.apply(this, arguments);
        //jabberui.addChatToList(this.getId());
    },
    render: function() {
        /*
         * Set up chat, chatStore, and dataview 
         * objects for use in the window
         */
        var chatId = 'chat' + this.getId();
        var chatStoreId = 'chatStore' + this.getId();
        var chat =  {
            id:chatId,
            msgs:[],
            update: function(msg, scope) {
                this.msgs.push(msg);
                scope.chatStore.load();
            },
            clear: function(scope) {
                this.msgs = new Array();
                scope.chatStore.load();
            }
        };
        var chatStore = new Ext.data.Store({
            id:chatStoreId,
            proxy: new Ext.data.MemoryProxy(chat),
            reader: new Ext.data.JsonReader({
                root:'msgs'},
            [
               {name: 'username'},
               {name: 'time'},
               {name: 'msg'}
            ]),
            listeners: {
                loadexception: function (o, responce, e, exception) {
                    Ext.MessageBox.alert('Error', exception);
                }
            }
        });
        
        var dataview = new Ext.DataView({
            id:'chatview' + this.getId()
            ,store:chatStore
            ,tpl: new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="msg"><b>{username}</b> ({time}): {msg}</div>',
            '</tpl>')
            ,itemSelector:'div.msg'
        });
        
        var panel = new Ext.Panel({
            id:'chatpanel' + this.getId()
            ,items: dataview
            ,anchor:'100% -50'
            ,autoScroll: true
        });

        this.chat = chat;
        this.chatStore = chatStore;
        this.items.insert(0, panel.id, panel);
        
        ChatWindow.superclass.render.apply(this, arguments);
    },
    addMsg:function(userName, msg, timestamp) {
        var chat = Ext.getCmp(this.getId()).chat;

        msg = Ext.util.Format.htmlEncode(msg).urlize().smilize().replace(/\n/g,"<br/>");
        if (userName !== this.user) {
            userName = userName.toString().split('@')[0];
        }
        if (!timestamp) {
            timestamp = new Date();
        }

        var sTime; //string containg formatted time
        //show day and month only if day != today
        if (timestamp.format('jmY') == (new Date()).format('jmY')){
            sTime = timestamp.format('G:i');
        } else {
            sTime = timestamp.format('G:i, M j');
        }

        var lMsg = {
            username: userName,
            time: sTime,
            msg: msg
        };
        chat.update(lMsg, this);
        var panel = Ext.getCmp('chatpanel'+this.getId());
        panel.body.scroll('down', 5000, true);
        
        // play sounds
        var tm = msg.trim();
        if ((soundManager.enabled) && (tm.split(' ', 1)[0] == '/play')){
            var i = tm.indexOf(' ');
            var sound = tm.substring(i).trim();
            
            if (sound == 'trombone') {
                soundManager.play('trombone', 'sound/sad_trombone.mp3');
            }
            else if (sound == 'moo') {
                soundManager.play('moo', 'sound/cow.mp3');
            }
            else if (sound == 'cheer') {
                soundManager.play('cheer', 'sound/cheer.mp3');
            }
            else if (sound == 'fart') {
                soundManager.play('fart', 'sound/fartus_tubartus.mp3');
            }
        }

        /* now do show signals if the message comes from another user */
        if (userName == this.user) return;

        // check also for document.hasFocus existence: WebKit has not yet implemented it
        if ((!this.isActive) || (typeof document.hasFocus == 'undefined') || (!document.hasFocus())) {
            this.visualBeep = true;
        }
    },
    listeners: {
        beforehide: function(t) {
            jabberui.removeChat(t.getId());
            jabberui.refreshChats();
        },
        beforeshow: function(t){
            jabberui.addChat(t.getId());
            jabberui.refreshChats();
        },
        collapse: function(panel){
            jabberui.refreshChats();
        },
        expand: function(panel){
            jabberui.refreshChats();
        },
        activate: function(t){
            t.isActive = true;
            t.visualBeep = false;
        },
        deactivate: function(t){
            t.isActive = false;
        }
    }
 });
 
 Ext.reg('chatwindow', ChatWindow);
