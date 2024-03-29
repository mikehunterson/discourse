import MountWidget from 'discourse/components/mount-widget';
import { observes } from 'ember-addons/ember-computed-decorators';
import Docking from 'discourse/mixins/docking';

const _flagProperties = [];
function addFlagProperty(prop) {
  _flagProperties.pushObject(prop);
}

const PANEL_BODY_MARGIN = 30;

const SiteHeaderComponent = MountWidget.extend(Docking, {
  widget: 'header',
  docAt: null,
  dockedHeader: null,
  _topic: null,

  @observes('currentUser.unread_notifications', 'currentUser.unread_private_messages')
  _notificationsChanged() {
    this.queueRerender();
  },

  dockCheck(info) {
    if (this.docAt === null) {
      const outlet = $('#main-outlet');
      if (!(outlet && outlet.length === 1)) return;
      this.docAt = outlet.offset().top;
    }

    const $body = $('body');
    const offset = info.offset();
      if (!this.dockedHeader) {
        $body.addClass('docked');
    }
  },

  setTopic(topic) {
    this._topic = topic;
    this.queueRerender();
  },

  didInsertElement() {
    this._super();
    $(window).on('resize.discourse-menu-panel', () => this.afterRender());

    this.appEvents.on('header:show-topic', topic => this.setTopic(topic));
    this.appEvents.on('header:hide-topic', () => this.setTopic(null));

    this.dispatch('notifications:changed', 'user-notifications');
    this.dispatch('header:keyboard-trigger', 'header');

    this.appEvents.on('dom:clean', () => {
      // For performance, only trigger a re-render if any menu panels are visible
      if (this.$('.menu-panel').length) {
        this.eventDispatched('dom:clean', 'header');
      }
    });
  },

  willDestroyElement() {
    this._super();
    $('body').off('keydown.header');
    $(window).off('resize.discourse-menu-panel');

    this.appEvents.off('header:show-topic');
    this.appEvents.off('header:hide-topic');
    this.appEvents.off('dom:clean');
  },

  buildArgs() {
    return {
      flagCount: _flagProperties.reduce((prev, cur) => prev + (this.get(cur) || 0), 0),
      topic: this._topic,
      canSignUp: this.get('canSignUp')
    };
  },

  afterRender() {
    const $menuPanels = $('.menu-panel');
    if ($menuPanels.length === 0) { return; }

    const $window = $(window);
    const windowWidth = parseInt($window.width());


    const headerWidth = $('#main-outlet .container').width() || 1100;
    const remaining = parseInt((windowWidth - headerWidth) / 2);
    const viewMode = (remaining < 50) ? 'slide-in' : 'drop-down';

    $menuPanels.each((idx, panel) => {
      const $panel = $(panel);
      let width = parseInt($panel.attr('data-max-width') || 300);
      if ((windowWidth - width) < 50) {
        width = windowWidth - 50;
      }

      $panel.removeClass('drop-down').removeClass('slide-in').addClass(viewMode);

      const $panelBody = $('.panel-body', $panel);
      let contentHeight = parseInt($('.panel-body-contents', $panel).height());

      // We use a mutationObserver to check for style changes, so it's important
      // we don't set it if it doesn't change. Same goes for the $panelBody!
      const style = $panel.prop('style');

      if (viewMode === 'drop-down') {
        const $buttonPanel = $('header ul.icons');
        if ($buttonPanel.length === 0) { return; }

        // These values need to be set here, not in the css file - this is to deal with the
        // possibility of the window being resized and the menu changing from .slide-in to .drop-down.
        if (style.top !== '100%' || style.height !== 'auto') {
          $panel.css({ top: '100%', height: 'auto' });
        }

        // adjust panel height
        const fullHeight = parseInt($window.height());
        const offsetTop = $panel.offset().top;
        const scrollTop = $window.scrollTop();

        if (contentHeight + (offsetTop - scrollTop) + PANEL_BODY_MARGIN > fullHeight) {
          contentHeight = fullHeight - (offsetTop - scrollTop) - PANEL_BODY_MARGIN;
        }
        if ($panelBody.height() !== contentHeight) {
          $panelBody.height(contentHeight);
        }
        $('body').addClass('drop-down-visible');
      } else {
        const menuTop = headerHeight();

        let height;
        const winHeight = $(window).height() - 16;
        if ((menuTop + contentHeight) < winHeight) {
          height = contentHeight + "px";
        } else {
          height = winHeight - menuTop;
        }

        if ($panelBody.prop('style').height !== '100%') {
          $panelBody.height('100%');
        }
        if (style.top !== menuTop + "px" || style.height !== height) {
          $panel.css({ top: menuTop + "px", height });
        }
        $('body').removeClass('drop-down-visible');
      }

      $panel.width(width);
    });
  }
});

export default SiteHeaderComponent;

function applyFlaggedProperties() {
  const args = _flagProperties.slice();
  args.push(function() {
    this.queueRerender();
  }.on('init'));

  SiteHeaderComponent.reopen({ _flagsChanged: Ember.observer.apply(this, args) });
}

addFlagProperty('currentUser.site_flagged_posts_count');
addFlagProperty('currentUser.post_queue_new_count');

export { addFlagProperty, applyFlaggedProperties };

export function headerHeight() {
  const $header = $('header.d-header');
  const headerOffset = $header.offset();
  const headerOffsetTop = (headerOffset) ? headerOffset.top : 0;
  return parseInt($header.outerHeight() + headerOffsetTop - $(window).scrollTop());
}
