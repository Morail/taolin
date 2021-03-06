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

var pWidth = getBodySize(1/3)[0];
var desiredPanelWidth = pWidth < 400 ? pWidth : 400; // 400px is the max. value
                
/* PROFILE TEMPLATES */

var userinfo_tpl = new Ext.XTemplate(
    '<div class="user-profile-class">',
        '<b><span style="font-size:130%;font-family: Verdana;">{name} {surname}</span>',
        /* if own profile, prompt a shortcut to edit the profile */
        '<tpl if="((reqid === \'\') || (reqid == user.id))">',
            '<span style="padding-left:10px;" class="a" onclick="expandUserEditProfilePanel()">Edit</span>',
        '</tpl>',
        '</b><br/>',
        '<span id="user-status"></span><br />',
        '<tpl if="email">',
            '<b>E-mail:</b><span onclick="new SendToWindow(\'\',\'\', \[\[\'{email}\', \'{name} {surname}\'\]\], {sourceSendMail})"><span class="sprited email a">{email}</span></span>',
        '</tpl>',
        '<tpl if="((phone) && (phone != \'0\'))">',
            '<br /><b>Phone:</b><span> {phone}</span>',
        '</tpl>',
        '<tpl if="((phone2) && (phone2 != \'0\'))">',
            '<br /><b>Phone 2:</b><span> {phone2}</span>',
        '</tpl>',
    '<div>',{
        compiled: true
        ,disableFormats: true
    }
);

var usertext_tpl = new Ext.XTemplate(
    '<div class="user-profile-class">',
    /* check if the user is "chattable" */
    '<tpl if="((reqid !== \'\') && (login) && (jabber.u_n !== login) && (active === \'1\')) && (!isOwner(id))">',
        '<div class="user-item user-{login}" style="margin: 0 10px"><span class="a" onclick=\'jabberui.createNewChatWindow("{login}@fbk.eu")\'>Chat with {name} {surname}</span></div><br />',
    '</tpl>',
    /* if s/he is not a champion, suggest as a champion! */
    '<tpl if="((reqid !== \'\') && (active !== \'1\'))">',
        '<tpl if="login">',
            '<div class="confirm-msg" style="text-align:left">{name} is not a champion. You can <span class="a" onclick="suggestAsChampion(\'{name}\', \'{surname}\', \'{login}\', \'{email}\', {sourceSuggestAs})">suggest {name} as a new {[config.appname]} champion!</span></div><br />',
        '</tpl>',
        '<tpl if="!login">',
            '<div class="warning-msg" style="text-align:left">{name} can not be a champion until system administrators provide {gender:pronoun(2)} a valid login</div><br />',
        '</tpl>',
    '</tpl>',
    '<tpl if="((personal_page) && (personal_page != \'null\'))">',
        '<b>Home page:</b> <span><a href="{personal_page}" target="_blank">{personal_page:removeHttp}</a></span><br />',
    '</tpl>',
    '<tpl if="building_id">',
        '<b>Workplace:</b>',
        '<span>',
            ' <span class="a" onclick="openMapWindow({building_id}, {id}, \'user profile\')">where\'s {gender:pronoun} office?</span>',
        '</span>',
        '<br />',
    '</tpl>',
    '<tpl if="date_of_birth">',
        '<b>Date of birth:</b><span> {date_of_birth:birth}</span><br />',
    '</tpl>',
    '<tpl if="home_address">',
        '<br /><b>Lives in:</b><span> {home_address}</span><br />',
    '</tpl>',
    '<tpl if="carpooling">',
        '<img class="inline" src="js/portal/shared/icons/fam/car.png" /> <b>Available for carpooling!</b><br />',
    '</tpl>',

    /*********************************************
     * START Group description
     *********************************************/
    '<tpl if="groups_description">',
        '<br /><b>{[config.defaultgroupname]}</b>',
        '<br />',
        '<span>',
            '<ul style="padding: 5px 0 0 20px">', 
            '<tpl for="groups">',
                '<li style="list-style-type:disc;">',
                    '<span class ="a" onclick="groupDetails(\'{id}\', \'{name}\',{parent.sourceGroupWindow})">',
                        '<tpl if="description_en">{description_en} - </tpl>',
                        '<tpl if="description_it">{description_it} - </tpl>',
                        '{name}',
                    '</span>',
                '</li>',
            '</tpl>',
            '</ul>',
        '</span><br />',
    '</tpl>',
    /*********************************************
     * END Group description
     *********************************************/
    
    /**********************************************
     * START Social Networking
     *********************************************/
    '<tpl if="(linkedin) || (twitter) || (facebook)">', // if one of the social network's field is present...
        '<b>Social networking on:</b><br />',
        '<span style="padding-left:10px">',
            '<tpl if="linkedin">',
                '<a href="http://www.linkedin.com/in/{linkedin}" target="_blank"><img src="http://www.google.com/s2/favicons?domain=linkedin.com" class="size16x16 inline" style="padding-right: 10px;" title="linkedin"/></a>',
            '</tpl>',
            '<tpl if="twitter">',
                '<a href="http://twitter.com/{twitter}" target="_blank"><img src="http://www.google.com/s2/favicons?domain=twitter.com" class="size16x16 inline" style="padding-right: 10px;" title="twitter" /></a>',
            '</tpl>',
            '<tpl if="facebook">',
                '<a href="{facebook}" target="_blank"><img src="http://www.google.com/s2/favicons?domain=facebook.com" class="size16x16 inline" style="padding-right: 10px;" title="facebook"/></a>',
            '</tpl>',
        '</span><br /><br />',
    '</tpl>',
    /**********************************************
     * END Social Networking
     *********************************************/
    '<tpl if="mod_description">',
        '<b>About {name}:</b><span> {mod_description}</span>',
    '</tpl>',
    '<tpl if="((!(mod_description) || (mod_description == \'\')) && isOwner(id))">',
        '<b>About {name}: </b><span class="a" onclick="expandUserEditProfilePanel()">Describe yourself, your activities and your interests</span>',
    '</tpl>',
    '</div>'
    ,{
        compiled: true
        //,disableFormats: true
    }
);


/* WEST PANEL */
westPanel = new Ext.Panel({
    region:'west',
    id:'west-panel',
    title:'Social Bar',
    split:true,
    width: desiredPanelWidth,
    maxSize: 400,
    minSize: 320,
    /* This panel should not be closed, only collapsed */
    margins:'5 0 5 5',
    cmargins:'5 5 5 5',
    layout:'accordion',
    layoutConfig:{
        hideCollapseTool:true,
        titleCollapse:true,
        activeOnTop: false
    },
    items: [{
        xtype:'timeline'
        ,id: 'timeline'
        ,isReloadable: function(){
            return !this.collapsed;
        }
        ,listeners: {
            expand: function(){
                eventManager.fireEvent('newtimelineevent');
            }
        }
    },{
        xtype:'userprofile'
        ,id: 'user_profile'
        ,firstExpand: true
        ,listeners: {
            beforeexpand: function(t){
                if (t.firstExpand) {
                    showUserInfo(null, true);
                    t.firstExpand = false;
                }
            }
        }
    },{
        title:'Edit your profile',
        border:false,
        autoScroll:true,
        iconCls:'user-edit',
        frame:true,
        id:'edit_profile',
        layout: 'fit',
        collapsible:true,
        hideCollapseTool:true,
        tools: toolsnotclose,
        listeners: {
            /* When this accordion panel collapse it expands automatically
             * the other panel
             *
             * not in use
             */
            /*collapse: expandUserPanel,*/
            render: function(t){
                t.add(new Ext.ux.fbk.sonet.UserEditProfile());
            }
        }
    },{
        title:'Edit your settings',
        border:false,
        autoScroll:true,
        iconCls:'settings',
        frame:true,
        id:'settings',
        layout: 'fit',
        collapsible:true,
        hideCollapseTool:true,
        tools: toolsnotclose,
        listeners: {
            /* When this accordion panel collapse it expands automatically
             * the other panel
             *
             * not in use
             */
            /*collapse: expandUserPanel,*/
            render: function(t){
                t.add(new Ext.ux.fbk.sonet.Settings());
            }
            ,expand: function(t){
                t.items.first().items.first().store.load(); // Load backgrounds' store
            }
        }
    }]

    /**
      * @param {String} login requested user's login
      */
    ,showPublik: function(u_id, login){
        var tab = Ext.getCmp('wp-publik-tab');

        tab.store.load({params: {u_id: u_id, login: login}});
    }
    
    /**
      * @param {Integer} id requested user's id
      *
      */
    ,showPhotos: function(id){
        var tab = Ext.getCmp('wp-photos-tab');

        tab.store.load({params: {u_id: id}});
    }
    
    /** showUser function
     * show selected user's profile
     * @param {Integer} reqid requested user's id
     * @param {bool} hidePanel if true the user profile panel has not to be shown
     * @param {Object} source for logging purpose, it records the place where the requests started
     */
    ,showUser: function(reqid, hidePanel, logparams){
        if (!reqid) reqid = '';
        if (!hidePanel) {
            hidePanel = false;
        }
        
        Ext.getCmp('user_profile').firstExpand = false;
        if(!hidePanel) expandUserPanel();

        if(westPanel.showedUser)
            if(reqid == westPanel.showedUser.id) return false;
        
        Ext.Ajax.request({
            url : 'users/getinfo/'+reqid,
            method: 'GET',
            params: {src: Ext.util.JSON.encode(logparams)},
            success: function ( result, request ) {
                /*
                 * Whenever this function shows user info it shall expand the
                 * accordion panel containing 'user_image' div
                 */
                // Show user info (aka first tab of tabpanel)

                Ext.getCmp('user_profile').items.items[1].setActiveTab(0);
                var fm = Ext.util.Format
                    ,jsondata = Ext.util.JSON.decode(result.responseText)
                    ,user_text = ''
                    ,u = jsondata.user;
                westPanel.showedUser = u;


                if(reqid==='' && user.id===u.id ) { //this call always gives access to this user data
                    user.login = u.login;
                    if(jsondata.user.email) 
                        user.email = u.email;
                }
                
                westPanel.showPublik(u.id, u.login);
                westPanel.showPhotos(u.id);

                //save in a retrievable place if this photo is user's photo
                //and then show tools
                westPanel.showTools = ((!reqid) || (reqid == user.id));
                showText(westPanel.showTools, 'user-profile-edit-div'); // Shows tools and Edit box only if the showed profile belongs to the user

                if (('photo' in u) && (u.photo))
                    $("#user_photo").attr('src', u.photo.src);
                
                else
                    $("#user_photo").attr('src', 'img/nophoto_small.png');
                
                var mod_description = u.mod_description;
                // call the methods urlize and smilize only if the object is not null
                if(mod_description) {
                    mod_description=mod_description.urlize().smilize();
                    //replaces \n with <br /> for visualization in html
                    mod_description = mod_description.replace(/(\n)/g,'<br />');
                }

                var suid = u.id,
                    encode = Ext.util.JSON.encode,
                    userProfileSource = fm.htmlEncode(
                        encode({source: 'user profile', user_id: suid})
                    );


                var tmpl_data = $.extend(true, {},
                    u,
                    {
                        reqid: reqid
                        ,mod_description: mod_description
                        ,sourceGroupWindow: userProfileSource
                        ,sourceSendMail: userProfileSource
                        ,sourceSuggestAs: fm.htmlEncode(
                            encode({source: 'suggest as champion', user_id: suid})
                        )
                    }
                );
    

                userinfo_tpl.overwrite(Ext.get('user_info'), tmpl_data);
                usertext_tpl.overwrite(Ext.get('user_text'), tmpl_data);
            
                if(u.login)
                    findChatStatus(reqid, u.login);
            }
       });
    }

});
