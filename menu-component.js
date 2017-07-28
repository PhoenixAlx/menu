var bus = new Vue();
class menu {
  constructor(container) {
    this.menuses = {};
    this.nodes = {};
    this.addMenuList(container)
    Vue.component('menu-item', {
      props: ['data','submenu_item'],
      template: '<div :id="data.id"   ><menu-list v-bind:data="data.daticos"  v-bind:key="data.id"  v-if="submenu_item"></menu-list><li v-on:click="clickElement(data.extraEvent )" v-else><p><span>{{ data.text }}</span></p></li></div>',
      methods: {
        clickElement: (extraEvent) => {
          if (!(extraEvent === null || extraEvent === undefined || extraEvent === '')) {
            extraEvent();
          }
          console.log("hago click")

        },
        flipSubmenu: function(nameMenu,state) {
          if (nameMenu === this.$el.id){
            console.log(this.submenu_item,state)
            this.submenu_item =state

          }
        }

      },
      created: function(){

        bus.$on('changeSubmenu',(nameMenu,state)=>{this.flipSubmenu(nameMenu,state)})


      }
    })
    Vue.component('menu-list', {
      props: ['data'],
      template: '<details :id="data.id" ><summary>{{ data.title }} </summary><ul ><menu-item  v-for="item in data.elements" v-bind:data="item" v-bind:key="item.id" v-bind:submenu_item="false" ref="item.id"></menu-item> </ul></details>',
    })

  }

  addComponent(submenu) {
    this.nodes[submenu] = new Vue({
      el: "#" + submenu,
      data: () => {
        return this.menuses[submenu]
      }


    });
  }
  addMenuList(container) {
    let new_submenu = document.getElementById(container)
    new_submenu.innerHTML = '<menu-list v-bind:data="daticos"  v-bind:key="id" ></menu-list>'
  }
  removeMenu(nameParent) {
    let submenu = "menu-" + nameParent;
    // this.nodes[submenu].life=false;
    bus.$emit('changeSubmenu',submenu,false);
    // delete this.menuses[submenu];
    //
    // //remove details-
    // console.log(this.nodes)
    // // let elem = document.getElementById(submenu);
    // // elem.remove();
    // this.nodes[submenu].$destroy();
    // for (let key in this.menuses) {
    //   let value = this.menuses[key];
    //   this.addComponent(key)
    //   this.nodes[key].$forceUpdate()
    //   // Use `key` and `value`
    // }

  }
  addMenus(datas_menu) {
    // {"elements":["cuaaack","recuaack"],"parent":"dark"}
    let datas_transform = [];
    let submenu = '';
    if (datas_menu.parent === null || datas_menu.parent === undefined || datas_menu.parent === '') {
      submenu = "menu"
    } else {
      submenu = "menu-" + datas_menu.parent;

      // this.addMenuList(submenu)
    }
    for (let e = 0; e < datas_menu.elements.length; e++) {
      let id = "menu-" + datas_menu.elements[e];

      datas_transform.push({
        "text": datas_menu.elements[e],
        "id": id,
        'extraEvent': null
      })
    }
    if (submenu in this.menuses) {
      this.menuses[submenu].daticos.elements = this.menuses[submenu].daticos.elements.concat(datas_transform);
    } else {
      this.menuses[submenu] = {
        daticos: {
          elements: datas_transform,
          id: "details-" + submenu,
          parent: submenu,
          title: datas_menu.title
        },
        id: "details-" + submenu
      }
    }
    this.addComponent(submenu);
    console.log(submenu);
    bus.$emit('changeSubmenu',submenu,true);

  }
}
let m = new menu("menu");
m.addMenus({
  "elements": ["Potatoes", "Ducks"],
  "title": " "
})
m.addMenus({
  "elements": ["White", "dark"],
  "parent": "Ducks",
  "title": "Ducks"
})

// m.addMenus({
//   "elements": ["cuaaack", "recuaack"],
//   "parent": "dark",
//   "title": "dark"
// })
// m.removeMenu("dark")
// m.addMenus({"elements":["cuaaack","recuaack"],"parent":"dark","title":"dark"})
