-- # Populating templates table

SELECT pg_catalog.setval('templates_id_seq', 19, true);

INSERT INTO templates VALUES (10, '{{ user | userify timelineid }} joined today FBK. Welcome {% if !user.deleted %}<span class="a" onclick="showUserInfo({{ userid }}, null, {source: ''timeline'', timeline_id: {{ timelineid }}})">{{ user.name }}</span>{% else %}{{ user.name }}{% endif %}!!!', 'timelineevent-newuser', 'img/icons/fugue/door-open.png', 0, '{{ user | user_adjectify timelineid }} arrival at FBK{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (1, '{{ user | userify timelineid }} edited a message in the <span class="a" onclick="addOrBounceWidget(''Board'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})">board widget</span>', 'boards-modifyads', 'js/portal/shared/icons/fam/report_edit.png', 1, '
');
INSERT INTO templates VALUES (12, '<b>{{ sitename }}</b> is proud to introduce you a brand new champion: welcome on board {{ user | userify timelineid }}!', 'users-admin_activate', 'img/icons/fugue/trophy.png', 0, 'the election of {{ user | userify timelineid}} as a champion of {{ sitename }}{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (2, '{{ user | userify timelineid }} wrote a new message on <span class="a" onclick="addOrBounceWidget(''Board'',''string_identifier'',{source: ''timeline'', timeline_id: {{ timelineid }}})">board widget</span>. You can <span class="a" onclick="addOrBounceWidget(''Board'',''string_identifier'',{source: ''timeline'', timeline_id: {{ timelineid }}})">write a message on the board</span> too!', 'boards-add', 'js/portal/shared/icons/fam/report_add.png', 0, '{{ user | user_adjectify timelineid }} message on the <span class="a" onclick="addOrBounceWidget(''Board'',''string_identifier'',{source: ''timeline'', timeline_id: {{ timelineid }}})">board</span> widget{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (15, '{{ user | userify timelineid }} commented on 
', 'comment', 'js/portal/shared/icons/fam/comment.png', 1, NULL);
INSERT INTO templates VALUES (4, '{{ user | userify timelineid }} upload {% if p_id %}<span class="a" onclick="showPicture({{p_id}}, {{user.id}})">a new picture</span>{% else %}a new picture{% endif %}<br/>Why don''t you <span class="a" onclick="new PhotoUploader()">upload a new photo</span> too?', 'photos-uploadphoto', 'img/icons/fugue/image-sunset.png', 0, '{{ user | user_adjectify timelineid }} {% if p_id %}<span class="a" onclick="showPicture({{p_id}}, {{user.id}})">photo</span>{% else %}photo{% endif %}{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (9, 'Today is a special day for {{ user | userify timelineid }}!<br />Happy birthday {% if !user.deleted %}<span class="a" onclick="showUserInfo({{ user.id }}, null, {source: ''timeline'', timeline_id: {{ timelineid }}})">{{ user.name }}{% else %}{{ user.name }}{% endif %}</span>!!!', 'timelineevent-happybirthday', 'img/icons/fugue/cake.png', 0, '{{ user | user_adjectify timelineid }} birthday{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (7, '{{ user | userify timelineid }} added <i>{{ name }}</i>.
{% if ! short_version %}<span class="a" onclick="addOrBounceWidget({{ w_id }}, ''widget_id'', {source: ''timeline'', timeline_id: {{ timelineid }}})">Add</span> this widget!{% endif %}
', 'users_widgets-addwidget', 'js/portal/shared/icons/fam/application_view_tile.png', 0, '{{ user | user_adjectify timelineid }} <span class="a" onclick="addOrBounceWidget({{ w_id }}, ''widget_id'', {source: ''timeline'', timeline_id: {{ timelineid }}})">{{ name }} widget</span> adoption{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (5, '{{ user | userify timelineid }} edited {{ user.adj }} <span class ="a" onclick="showUserInfo({{ user.id }}, null, {source: ''timeline'', timeline_id: {{ timelineid }}})">profile</span>.
{% if not short_version %}
You can <span class="a" onclick="expandSettingsPanel()">edit your profile</span> too!
{% endif %}
', 'users-setusersettings', 'js/portal/shared/icons/fam/vcard.png', 0, '{{ user | user_adjectify timelineid }} profile edit{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (16, '<table>
  <tr>
    <td valign="top">
      <div onclick="showUserInfo({{ user.id }}, null, {source: ''comment''})" style="text-align: center; width: 50px; cursor: pointer;">
        <img src="photos/getphotofromuserlogin/{{ user.login }}/40/40" style="padding: 2px 0pt;"/>
      </div>
    </td>
    <td>
      <h2>{{ user.name }} {{ user.surname }} wrote a message on the board</h2>
      <br />{{ text | truncate 80 | nl2br }}
    </td>
  </tr>
</table>
', 'boards-details', '', 0, '
');
INSERT INTO templates VALUES (18, '<div>
  <table style="margin:auto auto;">
    <tr>
      <td>
        <img src="{{ img_path }}t140x140/{{ filename }}" style="padding-right:10px"/>
      </td>
      <td>
        <div><b>{{ name }}</b></div>
      </td>
    </tr>
  </table>
</div>
', 'photo-details', '', 0, '
');
INSERT INTO templates VALUES (3, '{{ user | userify timelineid }} changed {{ user.adj }} {% if p_id %}<span class="a" onclick="showPicture({{p_id}}, {{user.id}})">default photo</span>{% else %}default photo{% endif %}.
{% if not short_version %}
You can <span class="a" onclick="openImageChooser()">edit your photos</span> too!
{% endif %}
', 'photos-setdefaultphoto', 'img/icons/fugue/picture--pencil.png', 1, '{{ user | user_adjectify timelineid }} {% if p_id %}<span class="a" onclick="showPicture({{p_id}}, {{user.id}})">photo</span>{% else %}photo{% endif %}{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (17, '<div style="padding:5px">
  <h2>{{ summary | truncate 150 | nl2br }}</h2>
  <div style="padding-top:10px;">
    <table style=>
      <tr>
        <td width="40px"><b>From:</b></td><td>{{ start_time | date ''D d M, Y - H:i'' }}</td>
      </tr>
      <tr>
        <td width="40px"><b>To:</b></td><td>{{ end_time | date ''D d M, Y - H:i'' }}</td>
      </tr>
    </table>
  </div>
</div>
', 'timelineevent-details', '', 0, '
');
INSERT INTO templates VALUES (8, '{{ user | userify timelineid }} changed  {{ user.adj }} <span class="a" onclick="(new Ext.ux.fbk.sonet.MapWindow({buildingId:{{ building }}, userId: {{ user.id }}, logparams: {source: ''timeline'', timeline_id: {{ timelineid }}}})).show()">position</span> on the workplace map.
{% if not short_version %}
Change <span class="a" onclick="(new Ext.ux.fbk.sonet.MapWindow({logparams: {source: ''timeline'', timeline_id: {{ timelineid }}}})).show()">your position</span>!
{% endif %}
', 'workplaces-save', 'js/portal/shared/icons/fam/map.png', 1, '{{ user | user_adjectify timelineid }} change of workplace position on the map{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (11, '{{ user | userify timelineid }} <span class="deco-text">{{ status }}</span>{% if not short_version %} (via <span class="a" onclick="addOrBounceWidget(''BuddyList'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})">chat status</span>)
{% endif %}', 'users_widgets-changeconf', 'img/icons/fugue/balloon-ellipsis.png', 1, '{{ user | user_adjectify timelineid }} chat status{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}
');
INSERT INTO templates VALUES (6, '{{ user | userify timelineid }} wrote an useful <span class="a" onclick="addOrBounceWidget(''Feedback'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})">feedback</span>.
{% if not short_version %}
You can <span class="a" onclick="addOrBounceWidget(''Feedback'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})"> help us by writing a suggestion</span> too!
{% endif %}
', 'feedbacks-add', 'img/icons/fugue/light-bulb.png', 1, '{{ user | user_adjectify timelineid }} feedback{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}');
INSERT INTO templates VALUES (13, 'A brand new <span class="a" onclick="addOrBounceWidget(''Events'', ''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})"> FBK event</span> has been created: "<i>{{ summary }}</i>" {% if uid %}({{ uid }}){% endif %}{% if start_time %} from {{ start_time | date ''d/m/y'' }}{% endif %}{% if end_time %} to {{ end_time | date ''d/m/y'' }}{% endif %}

{% if not short_version %}
<br />
Check it out in the <a href="javascript:void(0)" onclick="addOrBounceWidget(''Events'', ''string_identifier'', ''{&quot;source&quot;: &quot;timeline&quot;, &quot;timeline_id&quot;: &quot;{{ timelineid }}&quot;}'')">events</a> widget
{% endif %}
', 'timelineevent-newevent', 'img/icons/fugue/calendar-day.png', 0, 'the event "<i>{{ summary }}</i>" in the <span class="a" onclick="addOrBounceWidget(''Events'', ''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})">events</span> widget{% if comment %}: <br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}');
INSERT INTO templates VALUES (14, '{{ user | userify timelineid }} wrote a new event on <span class="a" onclick="addOrBounceWidget(''ChildrenEvent'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})"> the childrenevent widget</span>.
{% if not short_version %}
You can <span class="a" onclick="addOrBounceWidget(''ChildrenEvent'',''string_identifier'', {source: ''timeline'', timeline_id: {{ timelineid }}})">create a new event for children</span> too!
{% endif %}
', 'childrenevents-add', 'js/portal/shared/icons/fam/report_add.png', 1, '{{ user | user_adjectify timelineid }} event for children written in the <span class="a"onclick="addOrBounceWidget(''Board'',''string_identifier'',{source: ''timeline'', timeline_id: {{ timelineid }}})">children event</span> widget{% if comment %}:<br />"<span class="deco-text">{{ comment | truncate 40 | strip_tags | nl2br}}</span>"{% endif %}');
INSERT INTO templates VALUES (19, '<div style="padding:5px">
  <h2>{{ title | truncate 150 | nl2br }}</h2>
  <div style="padding-top:10px;">
    <table style=>
      {% if location %}
      <tr>
        <td width="40px"><b>Where:</b></td><td>{{ location }}</td>
      </tr>
      {% endif %}
      <tr>
        <td width="40px"><b>Date:</b></td><td>{{ date }}</td>
      </tr>
    </table>
  </div>
</div>
', 'childrenevents-details', '', 0, '');


-- # Populating widgets table

INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (1,'UsersPortlet','Random Users','Simple widget that shows 5 random people from our colleagues. Fantastic for associating name and research interests to faces you see every day in the corridors!','[]','{\"iconCls\":\"user\"}','{\"url\": \"users/getrandomusers\"}','randomusers.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (2,'UsersPortlet','Random Champions','Simple widget that shows 5 random people from our champions','[]','{\"iconCls\":\"user\"}','{\"url\": \"users/getrandomchampions\"}','randomchampions.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (3,'UsersPortlet','New colleagues','Daily check new colleagues... and greet them, if you like.','[{\"name\": \"showPhoto\", \"description\": \"Only who has a photo\", \"type\":\"boolean\"}]','{\"iconCls\":\"user\"}','{\"url\": \"users/getlastarrivedusers\", \"showPhoto\": true}','newcolleagues.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (4,'SearchUsers','Search users widget','Search for a colleague by name, surname, phone number or group\'s description','[]','{\"iconCls\": \"search\"}','{}','searchusers.png',0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (5,'BuddyList','Chat contacts','See the list of your chat contacts','[]','{\"iconCls\": \"chat\"}','{}','buddylist.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (6,'Events','Internal Events','A list of interesting internal events','[]','{\"iconCls\": \"date\"}','{}','fbkevents.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (7,'Feedback','Feedback provider','Use this widget to provide us every kind of feedbacks or suggestions reguarding taolin','[]','{\"iconCls\":\"feedback\"}','{}','feedbackprovider.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (8,'GroupsPortlet','Groups','Which groups do you belong to?','[]','{\"iconCls\": \"groups\"}','{}',NULL,0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (10,'FeedReader','Latest YouTube videos about FBK','See the latest videos uploaded on Youtube.com and tagged with \"FBK\"','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\":\"http://www.youtube.com/rss/user/ComunicazioneFBK/videos.rss\", \"items\": \"3\"}','rssfbkvideos.png',1,NOW(),'2009-02-23 16:09:02');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (11,'HtmlIncluder','Static html link in the widget','Text in the widget','[]','{\"iconCls\":\"weather\"}','{\"html\":\"<h1>Html here! Hello world</h1>\"}',NULL,0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (12,'Iframer','Weather in Trento','With this widget, you can monitor the weather in Trento in the next 3 days. Data from notkewl.com','[]','{\"iconCls\":\"weather\"}','{\"iframe_src_url\":\"http:\\/\\/www.gmodules.com\\/ig\\/ifr?url=http:\\/\\/www.notkewl.com\\/myWeather\\/myWeather.xml&up_paikka=ITXX0078&up_merkki=1\"}','weathertrento.png',1,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (14,'HtmlIncluder','New features for taolin','You can read which new features were added in the new version of taolin','[]','{\"iconCls\":\"feedback\"}','{\"url\":\"html/portal/changelog.html\"}','newfeatures.png',0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (33,'FeedReader','Latest news from Il Trentino (local newspaper of T','Read the latest news from the local newspaper Il Trentino, in Italian,','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://data.kataweb.it/rss/quotidianilocali_homepage/trentinocorrierealpi/home?pos=1,2,4,5,31,32,33,34,61,62,63,70,71,72,73,74,90,91,92\", \"items\" : \"5\"}',NULL,1,NOW(),'2009-02-23 16:08:39');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (17,'FeedReader','New Wikipedia pages ','A list of recently created Wikipedia pages','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"string\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\":\"http://en.wikipedia.org/w/index.php?title=Special:NewPages&feed=rss&namespace=0\", \"items\": \"5\"}',NULL,0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (19,'FeedReader','Recently modified Wikipedia pages','A list of recently modified Wikipedia pages.','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"string\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\":\"http://en.wikipedia.org/w/index.php?title=Special:RecentChanges&feed=rss\", \"items\": \"5\"}',NULL,0,NOW(),'2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (20,'FeedReader','Feed Reader','A generic feed reader','[{\"name\": \"url\", \"description\": \"URL\", \"type\":\"string\"}, {\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"items\": \"5\"}','feedreader.png',1,'2008-08-22 12:24:16','2009-02-23 16:09:45');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (21,'FeedReader','Latest news from Repubblica.it (in Italian)','Read the latest news from the RSS feed of Italian newspaper Repubblica (in Italian)','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://www.repubblica.it/rss/homepage/rss2.0.xml\", \"items\": \"5\"}','rssrepubblica.png',1,NOW(),'2009-02-23 16:11:22');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (22,'FeedReader','Latest news from Corriere.it (in Italian)','Read the latest news from the RSS feed of Italian newspaper Corriere (in Italian)','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://www.corriere.it/rss/homepage.xml\", \"items\": \"5\"}','rsscorriere.png',1,NOW(),'2009-02-23 16:11:37');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (27,'SearchWiki','Search in wikipedia','Search for a page in Wikipedia','[]','{\"iconCls\": \"search\"}','{\"wikiUrl\": \"http://en.wikipedia.org/wiki/\", \"apiUrl\": \"http://en.wikipedia.org/w/api.php\"}',NULL,0,'2008-08-26 13:23:13','2008-10-23 13:39:30');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (24,'FeedReader','Latest news from BBC.co.uk','Read the latest news from the RSS feed of BBC','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml\", \"items\": \"5\"}','rssbbc.png',1,NOW(),'2009-02-23 16:11:55');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (29,'Note','Note','A note-taking widget, with title and background customizable','[{\"name\": \"title\", \"description\": \"Title\", \"type\": \"string\"},{\"name\": \"bgcolor\", \"description\": \"Background color\", \"type\":\"color\"}]','{\"iconCls\":\"note\"}','{\"bgcolor\": \"FFFFE0\"}','notes.png',1,NOW(),'2009-02-23 16:19:09');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (30,'Ext.ux.fbk.sonet.GoogleWidget','Google','A Google search widget','[]','{\"iconCls\":\"google\"}','{}','googlesearch.png',1,'2008-09-25 10:28:28','2008-10-23 13:41:16');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (32,'FeedReader','Latest news from L\'Adige (local newspaper of Trent','Read the latest news from the local newspaper L\'Adige, in Italian,','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://www.ladige.it/rss/rss_news.php\", \"items\" : \"5\"}',NULL,1,NOW(),'2009-02-23 16:14:06');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (42,'FeedReader','Latest presentations by FBKers on www.slideshare.n','See the latest slide presentations uploaded by FBKers on www.slideshare.net','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\":\"http://www.slideshare.net/rss/user/fbk.eu\", \"items\": \"5\"}','fbkonslideshare.png',1,'2008-11-25 18:49:07','2009-02-23 16:16:02');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (43,'Board','Board announcements','Insert here your announcements or requests, they will be visible to the other champions!','[{\"name\": \"items\", \"description\": \"Displayed messages\", \"type\": \"string\"},{\"name\": \"showExpired\", \"description\": \"Show already expired messages too\", \"type\":\"boolean\"}]','{\"iconCls\":\"board\"}','{}','board.png',1,'2008-12-17 11:37:20','2009-01-07 08:11:14');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (44,'MathWidget','Math helper','A Math widget featuring a calculator and a graph plotter','[]','{\"iconCls\":\"calculator\"}','{}','math.png',1,'2008-12-17 11:38:02','2008-12-17 11:42:05');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (45,'Nevede','Nevede meeting scheduler','Create a new meeting using Nevede and see the latest scheduled meetings','[]','{\"iconCls\": \"nevede\"}','{}','nevede.png',1,'2008-12-17 11:38:46','2009-02-23 15:56:07');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (47,'FeedReader','Latest news from Google News (in Italian)','Read the latest news from the RSS feed of Google News (in Italian)','[{\"name\": \"items\", \"description\": \"Number of items to display\", \"type\": \"integer\"}, {\"name\": \"autoExpand\", \"type\": \"boolean\", \"description\": \"Auto expand news\"}]','{\"iconCls\":\"feed\"}','{\"url\": \"http://news.google.it/?output=rss\", \"items\": \"5\"}','googlenews.png',1,'2008-12-17 16:08:54','2009-02-23 16:05:08');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (51,'Ext.ux.fbk.sonet.MetaSearch','Search','Search inside taolin and in other external resources!','[{"name":"engines","description":"Search engines", "type":"BooleanList","values":{"users":{"title":"Users"}}}]','{\"iconCls\": \"search\"}','{"engines":{"users":{"title":"Users"}}}','metasearch.png',1,NOW(),'2009-02-23 16:22:56');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (52,'WebcamCanteen','Webcam canteen','Watch the queue to go in the canteen','[]','{\"iconCls\":\"webcam\"}','{}','webcamcanteen.png',1,NOW(),'2009-02-23 16:20:28');
INSERT INTO "widgets" ("id", "string_identifier", "name", "description", "user_params", "application_conf", "widget_conf", "screenshot", "enabled", "created", "modified") VALUES (53,'Iframer','Remember the Milk','Remember the Milk is a web based task list, widely used and easy. It can be integrated in Gmail account as well as with iPhone application or in your Blackberry','[{\"name\": \"height\", \"description\": \"Height of this widget\", \"type\": \"integer\"}]','{\"iconCls\":\"rememberthemilk\"}','{\"iframe_src_url\":\"http://www.rememberthemilk.com/services/modules/googleig/\", \"height\": 400}','rememberthemilk.png',1,NOW(),'2009-02-23 16:18:20');
INSERT INTO widgets VALUES (59, 'Iframer', 'Evernote', 'Evernote', '[{"name": "height", "description": "Height of this widget", "type": "integer"}]', '{"iconCls":"evernote"}', '{"iframe_src_url":"https://www.evernote.com/mobile/", "height": 400}', NULL, 1, '1970-01-01 00:00:00', '2009-03-11 14:03:43');


-- # Populating widgets_skel table

INSERT INTO "widgets_skel" ("id", "widget_id", "col", "pos", "tab") VALUES (1,51,0,0,0);
INSERT INTO "widgets_skel" ("id", "widget_id", "col", "pos", "tab") VALUES (2,3,0,1,0);
INSERT INTO "widgets_skel" ("id", "widget_id", "col", "pos", "tab") VALUES (3,7,1,0,0);
INSERT INTO "widgets_skel" ("id", "widget_id", "col", "pos", "tab") VALUES (4,5,2,0,0);

-- # Populating backgrounds table

INSERT INTO backgrounds VALUES (1, 'Blue curl', 'img/background/blue_curl.jpeg');
