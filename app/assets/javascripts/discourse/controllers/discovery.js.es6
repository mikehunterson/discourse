import DiscourseURL from 'discourse/lib/url';
import Topic from 'discourse/models/topic';

export default Ember.Controller.extend({
  needs: ['navigation/category', 'discovery/topics', 'application'],
  loading: false,

queryParams: ["loadtopic1"],
   loadtopic: "",
   
   welcometopic: function(){
 	var loadtopic = Discourse.get('loadtopic');
 	
 	if (loadtopic != '/'){
 		if (loadtopic.substring(0,3) != "/t/" ){
 			DiscourseURL.routeTo("/");
 		} else {
 			DiscourseURL.routeTo(loadtopic);
 			Discourse.set('loadtopic', undefined);
 		}
 	}
   }.property(),

  category: Em.computed.alias('controllers.navigation/category.category'),
  noSubcategories: Em.computed.alias('controllers.navigation/category.noSubcategories'),

  loadedAllItems: Em.computed.not("controllers.discovery/topics.model.canLoadMore"),

  _showFooter: function() {
    this.set("controllers.application.showFooter", this.get("loadedAllItems"));
  }.observes("loadedAllItems"),

  showMoreUrl(period) {
    let url = '', category = this.get('category');
    if (category) {
      url = '/c/' + Discourse.Category.slugFor(category) + (this.get('noSubcategories') ? '/none' : '') + '/l';
    }
    url += '/top/' + period;
    return url;
  },

  actions: {
    changePeriod(p) {
      DiscourseURL.routeTo(this.showMoreUrl(p));
    }
  }

});
