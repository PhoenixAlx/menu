class menu{
    constructor(container){
        this.name_container=container;
        this.active=false;
        this.element={};//Dict {'name':'id'}
        this.element_position={};//Dict {position:integer}
        this.img="";
        
    }
    putMenu(){
        this.addPrincipalHTML();
        this.addPrincipalCSS();
        this.addPrincipalEvent();
    }
    setImgMenu(src){
        //in example img/menu.png
        this.img=src;
    }
    addPrincipalHTML(){
        let botton_menu='<img id="menu_img_'+this.name_container+'" src="'+this.img+'" class="botton_menu"></img>';
        let navegation='<nav id="nav_menu_'+this.name_container+'" ></nav>';
        let div_container=document.getElementById(this.name_container);
        div_container.innerHTML=botton_menu+navegation;
        
    }
    addPrincipalCSS(){
        this.addCSSRule(document.styleSheets[0], ".botton_menu", "width: 40px;height:60px",1);
        document.getElementById(this.name_container).classList.add('menu_'+this.name_container);
        this.addCSSRule(document.styleSheets[0], 'summary::-webkit-details-marker', "display: none",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container, "display:block;z-index:1000;position:absolute",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav", "display:none;width:100%;border: solid 2px #000000; border-radius: 5px;",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav ul", "overflow:hidden;list-style:none;padding: 0;margin:0;text-align:center",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav li", "border-bottom: solid 1px #000000;",1);
    }
    addPrincipalEvent(){
        let botton_menu=document.getElementById('menu_img_'+this.name_container);
        botton_menu.addEventListener("click", ()=>{this.activeMenu()});
    }
    insertOptions(dict_options,parent){
        let position=0;
        let list_options=dict_options.elements;
        if (dict_options.parent!="undefined" && dict_options.parent!=null){
           position=this.element_position[dict_options.parent]+1;
        }
        let li_class="nav_menu_li_"+position;
        let ul_class='nav_menu_ul_'+position;
        let total_options="<ul class='"+ul_class+"'>";
        if (position>0){
            this.addCSSRule(document.styleSheets[0], '.'+li_class, "border-bottom: solid 0px #000000 !important;padding:10px;font-size:60%;text-transform: uppercase;",1);
        }else{
            this.addCSSRule(document.styleSheets[0], '.'+li_class+' p ', "padding:10px;font-size:120%;text-transform: uppercase;font-weight: bold;",1);
        }
        for (let i=0;i<list_options.length;i++){
            let id=parent+"_"+i;
            total_options=total_options+'<li id="'+id+'" class="'+li_class+'"><p><span >'+list_options[i]+'</span></p></li>';
            this.element_position[list_options[i]]=position;
            this.element[list_options[i]]=id; 
        }
        return total_options
    }
    addOptions(dict_options){
        // {"elements":[],"parent":null or undefined}
        if (dict_options.parent=="undefined" || dict_options.parent==null ){
            //principal options
            let parent="nav_menu_li_option";
            let nav_ul_menu=document.getElementById('nav_menu_'+this.name_container);
            nav_ul_menu.innerHTML=this.insertOptions(dict_options,parent)+'</ul>';
        }else{
            let parent=this.element[dict_options.parent];
            let li_parent=document.getElementById(parent);
            let new_li="<details><summary>"+li_parent.innerHTML+"</summary>";
            new_li=new_li+this.insertOptions(dict_options,parent)+'</ul></details>';
            li_parent.innerHTML=new_li;
        }
        
    }
    activeMenu(){
        let navegation=document.getElementById('nav_menu_'+this.name_container);
        if (this.active){
            navegation.style.display="none";
        }else{
            navegation.style.display="block";
        }
        this.active = !this.active;
    }
    
    addCSSRule(sheet, selector, rules, index) {
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }

}
