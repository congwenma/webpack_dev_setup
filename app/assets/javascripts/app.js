// https://codepen.io/anon/pen/yxqrEZ

let MicroPost = Backbone.Model.extend({
  defaults: {
    content: "content 1"
  },
  selectPost () {
    console.log('selecting post', this)
  }
});

let MicroPostCollection = Backbone.Collection.extend({
  model: MicroPost
});

let MicroPostView = Backbone.View.extend({
  tagName: 'li',
  template:_.template('<div><%= content %></div>'),
  events: {
    'click': 'selectThisPost'
  },
  selectThisPost() {
    this.model.selectPost()
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  destroy: function(){
    this.model.destroy();
  }
})

let MyView = Backbone.View.extend({
  events: {},
  mps: new MicroPostCollection(),
  initialize() {
    // debugger;
    this.mps.reset([]);
    window.microposts.map(mp => this.mps.push(mp));
    this.render();
  },
  render() {
    window.myApp = this;
    this.mps.each(micropost => {
      const currentView = new MicroPostView({
        model: micropost
      }).render().el;
      // debugger;

      this.$el.append(currentView)
      // this.$el.append(micropost.attributes.content);
      // this.$el.append("<div>------------</div>");
    });
  },
  clear() {
    this.mps.each(micropost => {
      this.mps.remove(micropost);
    });
  },
  half() {
    this.mps.reset(this.mps.slice(0, this.mps.length / 2)) // TODO: this even replaces that `each.remove`
    this.$el.empty()
    this.render();
  }
});

setTimeout(function() {
  // debugger;
  new MyView({
    el: $(".my-app")
  });
}, 1000);
