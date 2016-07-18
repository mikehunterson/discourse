import RestModel from 'discourse/models/rest';
import Model from 'discourse/models/model';

function topicsFrom(result, store) {
  if (!result) { return; }
if (result.filter == "latest") { 
 		Discourse.set('late', true); 
 		Discourse.set('topiclistcas', undefined);
 	}
  // Stitch together our side loaded data
  const categories = Discourse.Category.list(),
        users = Model.extractByKey(result.users, Discourse.User);

  var games = 0, news = 0, blogs = 0;
 var size = 0, key;
     for (key in result.topic_list.topics) {
         if (result.topic_list.topics.hasOwnProperty(key)) size++;
	}

if (result.filter == 'c/pokeriverkot/l/latest') {
    Discourse.set('count', 0);
    Discourse.set('reviewcount', 0);
    return result.topic_list.topics.map(function (t) {
            t.category = categories.findBy('id', t.category_id);
            t.arvostelu = true;
            if (t.category_id == 5 && t.closed != true){
              Discourse.set('count', Discourse.get('count') + 1);
              if (Discourse.get('reviewcount') == 2){
                Discourse.set('games3nimi', t.fancy_title);
                Discourse.set('games3linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('games3id', ""); } else { Discourse.set('games3id', t.id); }
                Discourse.set('reviewcount', Discourse.get('reviewcount') + 1);
              }
              if (Discourse.get('reviewcount') == 1){
                Discourse.set('games2nimi', t.fancy_title);
                Discourse.set('games2linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('games2id', ""); } else { Discourse.set('games2id', t.id); }
                Discourse.set('reviewcount', Discourse.get('reviewcount') + 1);
              }
              if (Discourse.get('reviewcount') == 0){
                Discourse.set('games1nimi', t.fancy_title);
                Discourse.set('games1linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('games1id', ""); } else { Discourse.set('games1id', t.id); }
                Discourse.set('reviewcount', Discourse.get('reviewcount') + 1);
              }
            }
            if (t.slug == 'dhoze' && Discourse.get('orig') == 'late') { t.arvostelu = undefined; }
            if (Discourse.get('count') > 9 && Discourse.get('orig') == 'late') { t.arvostelu = undefined; }
            t.posters.forEach(function(p) {
              p.user = users[p.user_id];
            });
            if (t.participants) {
              t.participants.forEach(function(p) {
              p.user = users[p.user_id];
              });
            }
            return store.createRecord('topic', t);
      });
  } else if (result.filter == 'c/uutiset/l/latest') {
    Discourse.set('newscount', 0);
    return result.topic_list.topics.map(function (t) {
            t.category = categories.findBy('id', t.category_id);
              t.arvostelu = true;
            if (t.category_id == 6 && t.closed != true){
              if (Discourse.get('newscount') == 3){
                Discourse.set('news4linkki', t.slug);
                Discourse.set('newscount', Discourse.get('newscount') + 1);
              }
              if (Discourse.get('newscount') == 2){
                Discourse.set('news3nimi', t.fancy_title);
                Discourse.set('news3linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('news3id', ""); } else { Discourse.set('news3id', t.id); }
                Discourse.set('newscount', Discourse.get('newscount') + 1);
              }
              if (Discourse.get('newscount') == 1){
                Discourse.set('news2nimi', t.fancy_title);
                Discourse.set('news2linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('news2id', ""); } else { Discourse.set('news2id', t.id); }
                Discourse.set('newscount', Discourse.get('newscount') + 1);
              }
              if (Discourse.get('newscount') == 0){
                Discourse.set('news1nimi', t.fancy_title);
                Discourse.set('news1linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('news1id', ""); } else { Discourse.set('news1id', t.id); }
                Discourse.set('newscount', Discourse.get('newscount') + 1);
              }
            }
            t.posters.forEach(function(p) {
              p.user = users[p.user_id];
            });
            if (t.participants) {
              t.participants.forEach(function(p) {
              p.user = users[p.user_id];
              });
            }
            return store.createRecord('topic', t);
      });
  } else if (result.filter == 'c/keskustelupalsta/l/latest') {
    Discourse.set('forumcount', 0);
    return result.topic_list.topics.map(function (t) {
            t.category = categories.findBy('id', t.category_id);
              t.arvostelu = true;
            if (t.category_id == 7 && t.closed != true){
              if (Discourse.get('forumcount') == 2){
                Discourse.set('blogs3nimi', t.fancy_title);
                Discourse.set('blogs3linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('blogs3id', ""); } else { Discourse.set('blogs3id', t.id); }
                
                Discourse.set('forumcount', Discourse.get('forumcount') + 1);
              }
              if (Discourse.get('forumcount') == 1){
                Discourse.set('blogs2nimi', t.fancy_title);
                Discourse.set('blogs2linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('blogs2id', ""); } else { Discourse.set('blogs2id', t.id); }
                Discourse.set('forumcount', Discourse.get('forumcount') + 1);
              }
              if (Discourse.get('forumcount') == 0){
                Discourse.set('blogs1nimi', t.fancy_title);
                Discourse.set('blogs1linkki', t.slug);
                if ( t.id == undefined ){ Discourse.set('blogs1id', ""); } else { Discourse.set('blogs1id', t.id); }
                Discourse.set('forumcount', Discourse.get('forumcount') + 1);
              }
            }
            t.posters.forEach(function(p) {
              p.user = users[p.user_id];
            });
            if (t.participants) {
              t.participants.forEach(function(p) {
              p.user = users[p.user_id];
              });
            }
            return store.createRecord('topic', t);
      });
  } else {
    Discourse.set('count', 0);
    return result.topic_list.topics.map(function (t) {
      
	    t.category = categories.findBy('id', t.category_id);
      if (Discourse.get('orig') == 'late' && t.category_id != 5) { 
              t.arvostelu = undefined;
		console.log("eka" + Discourse.get("count"));
            } else {
              Discourse.set('count', Discourse.get('count') + 1);
	      if (Discourse.get("count") < 11) {
              	t.arvostelu = true;
		console.log("toka" + Discourse.get("count"));
	      } else {
		t.arvostelu = undefined;
		console.log("kolmas" + Discourse.get("count"));
	      }
            }
	    t.posters.forEach(function(p) {
	      p.user = users[p.user_id];
	    });
	    if (t.participants) {
	      t.participants.forEach(function(p) {
		p.user = users[p.user_id];
	      });
	    }
	    return store.createRecord('topic', t);
	  });
  }
}


const TopicList = RestModel.extend({
  canLoadMore: Em.computed.notEmpty("more_topics_url"),

  forEachNew(topics, callback) {
    const topicIds = [];

    _.each(this.get('topics'), topic => topicIds[topic.get('id')] = true);

    _.each(topics, topic => {
      if (!topicIds[topic.id]) {
        callback(topic);
      }
    });
  },

  refreshSort(order, ascending) {
    let params = this.get('params') || {};

    if (params.q) {
      // search is unique, nothing else allowed with it
      params = { q: params.q };
    } else {
      params.order = order || params.order;
      params.ascending = ascending;
    }

    this.set('params', params);
  },

  loadMore() {
    if (this.get('loadingMore')) { return Ember.RSVP.resolve(); }

    const moreUrl = this.get('more_topics_url');
    if (moreUrl) {
      const self = this;
      this.set('loadingMore', true);

      const store = this.store;
      return Discourse.ajax({url: moreUrl}).then(function (result) {
        let topicsAdded = 0;

        if (result) {
          // the new topics loaded from the server
          const newTopics = topicsFrom(result, store),
              topics = self.get("topics");

          self.forEachNew(newTopics, function(t) {
            t.set('highlight', topicsAdded++ === 0);
            topics.pushObject(t);
          });

          self.setProperties({
            loadingMore: false,
            more_topics_url: result.topic_list.more_topics_url
          });

          Discourse.Session.currentProp('topicList', self);
          return self.get('more_topics_url');
        }
      });
    } else {
      // Return a promise indicating no more results
      return Ember.RSVP.resolve();
    }
  },


  // loads topics with these ids "before" the current topics
  loadBefore(topic_ids) {
    const topicList = this,
          topics = this.get('topics');

    // refresh dupes
    topics.removeObjects(topics.filter(topic => topic_ids.indexOf(topic.get('id')) >= 0));

    const url = `${Discourse.getURL("/")}${this.get('filter')}?topic_ids=${topic_ids.join(",")}`;
    const store = this.store;

    return Discourse.ajax({ url }).then(result => {
      let i = 0;
      topicList.forEachNew(topicsFrom(result, store), function(t) {
        // highlight the first of the new topics so we can get a visual feedback
        t.set('highlight', true);
        topics.insertAt(i,t);
        i++;
      });
      Discourse.Session.currentProp('topicList', topicList);
    });
  }
});

TopicList.reopenClass({

  munge(json, store) {
    console.log(json);
    json.inserted = json.inserted || [];
    json.can_create_topic = json.topic_list.can_create_topic;
    json.more_topics_url = json.topic_list.more_topics_url;
    json.draft_key = json.topic_list.draft_key;
    json.draft_sequence = json.topic_list.draft_sequence;
    json.draft = json.topic_list.draft;
    json.for_period = json.topic_list.for_period;
    json.loaded = true;
    if (json.filter == 'latest') {
       Discourse.set('orig', 'late');
 
       
       json.filter = 'c/uutiset/l/latest';
       topicsFrom(json, store);
       json.filter = 'c/keskustelupalsta/l/latest';
       topicsFrom(json, store);
       json.filter = 'c/pokeriverkot/l/latest';
       topicsFrom(json, store);
       
       json.filter = 'latest';
     } else {
        Discourse.set('orig', undefined);
      }
     if (json.filter == 'c/keskustelupalsta/l/latest') {
     	json.topics = topicsFrom(json, store);
     	json.per_page = json.topic_list.per_page;
    } else {
     	json.topics = topicsFrom(json, store).sortBy('created_at').reverse();
     	json.per_page = 100;
     }

    return json;
  },

  find(filter, params) {
    const store = Discourse.__container__.lookup('store:main');
    return store.findFiltered('topicList', {filter, params});
  },

  // hide the category when it has no children
  hideUniformCategory(list, category) {
    list.set('hideCategory', category && !category.get("has_children"));
  }

});

export default TopicList;
