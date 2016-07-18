import computed from "ember-addons/ember-computed-decorators";
import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.Component.extend(StringBuffer, {
  tagName: 'li',
  classNameBindings: ['active', 'content.hasIcon:has-icon'],
  attributeBindings: ['title'],
  hidden: Em.computed.not('content.visible'),
  rerenderTriggers: ['content.count'],

  @computed("content.categoryName", "content.name")
  title(categoryName, name) {
    const extra = {};

    if (categoryName) {
      name = "category";
      extra.categoryName = categoryName;
    }

    return I18n.t("filters." + name.replace("/", ".") + ".help", extra);
  },

  @computed("content.filterMode", "filterMode")
  active(contentFilterMode, filterMode) {
    return contentFilterMode === filterMode ||
           filterMode.indexOf(contentFilterMode) === 0;
  },

  renderString(buffer) {
    const content = this.get('content');
    if (this.get('content.displayName') != 'Tuoreimmat') {
    buffer.push("<a href='" + content.get('href') + "' class='catlinkki' style='display:inline-block;padding-bottom: 4px;padding-top: 3px;font: 19px Arial, sans-serif;font-weight: bold;'>");
    if (content.get('hasIcon')) {
      buffer.push("<span class='" + content.get('name') + "'></span>");
    }
    buffer.push(this.get('content.displayName'));
    buffer.push("</a>");
    
	    if (content.name == "category/pokeriverkot"){
		if (Discourse.get('games1linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('games1linkki') + "/" + Discourse.get('games1id') + "'>");
			if (Discourse.get('games1nimi').length > 13) {
		  	buffer.push(Discourse.get('games1nimi').substring(0,13) + "..");
  		} else {
  			buffer.push(Discourse.get('games1nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('games2linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('games2linkki') + "/" + Discourse.get('games2id') + "'>");
			if (Discourse.get('games2nimi').length > 13) {
		  	buffer.push(Discourse.get('games2nimi').substring(0,13) + "..");
  		} else {
  			buffer.push(Discourse.get('games2nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('games3linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('games3linkki') + "/" + Discourse.get('games3id') + "'>");
			if (Discourse.get('games3nimi').length > 13) {
		  	buffer.push(Discourse.get('games3nimi').substring(0,13) + "..");
  		} else {
  			buffer.push(Discourse.get('games3nimi'));
  		}
			buffer.push("</a>");
		}
	    }
	    if (content.name == "category/uutiset"){
		if (Discourse.get('news1linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('news1linkki') + "/" + Discourse.get('news1id') + "'>");
			if (Discourse.get('news1nimi').length > 38) {
		  	buffer.push(Discourse.get('news1nimi').substring(0,38) + "..");
  		} else {
  			buffer.push(Discourse.get('news1nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('news2linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('news2linkki') + "/" + Discourse.get('news2id') + "'>");
			if (Discourse.get('news2nimi').length > 38) {
		  	buffer.push(Discourse.get('news2nimi').substring(0,38) + "..");
  		} else {
  			buffer.push(Discourse.get('news2nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('news3linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('news3linkki') + "/" + Discourse.get('news3id') + "'>");
			if (Discourse.get('news3nimi').length > 38) {
		  	buffer.push(Discourse.get('news3nimi').substring(0,38) + "..");
  		} else {
  			buffer.push(Discourse.get('news3nimi'));
  		}
			buffer.push("</a>");
		}
	    }
	 if (content.name == "category/keskustelupalsta"){
		if (Discourse.get('blogs1linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('blogs1linkki') + "/" + Discourse.get('blogs1id') + "'>");
			if (Discourse.get('blogs1nimi').length > 33) {
		  	buffer.push(Discourse.get('blogs1nimi').substring(0,33) + "..");
  		} else {
  			buffer.push(Discourse.get('blogs1nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('blogs2linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('blogs2linkki') + "/" + Discourse.get('blogs2id') + "'>");
			if (Discourse.get('blogs2nimi').length > 33) {
		  	buffer.push(Discourse.get('blogs2nimi').substring(0,33) + "..");
  		} else {
  			buffer.push(Discourse.get('blogs2nimi'));
  		}
			buffer.push("</a>");
		}
		if (Discourse.get('blogs3linkki') != undefined) {
			buffer.push("<a href='http://www.bittipaja.com/t/" + Discourse.get('blogs3linkki') + "/" + Discourse.get('blogs3id') + "'>");
			if (Discourse.get('blogs3nimi').length > 33) {
		  	buffer.push(Discourse.get('blogs3nimi').substring(0,33) + "..");
  		} else {
  			buffer.push(Discourse.get('blogs3nimi'));
  		}
			buffer.push("</a>");
		}
	}

 }
}

});
