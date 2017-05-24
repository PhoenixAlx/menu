class menu{
    constructor(container){
        this.name_container=container;
        this.active=false;
        this.element={};//Dict {'name':'id'}
        this.element_position={};//Dict {position:integer}
        this.img="";
        this.z_index=10000;
        
    }
    putMenu(){
        this.addPrincipalHTML();
        this.addPrincipalEvent();
    }
    set imgMenu(src){
        //in example img/menu.png
        this.img=src;
    }
    set zIndex(value){
        this.z_index=value;
    }
    addPrincipalHTML(){
        this.addMenuCSS();
        let botton_menu='<img id="menu_img_'+this.name_container+'" src="'+this.img+'" ></img>';
        let navegation='<nav id="nav_menu_'+this.name_container+'" ></nav>';
        let div_container=document.getElementById(this.name_container);
        div_container.innerHTML=botton_menu+navegation;
        this.addButtonCSS("40px","60px")
        this.addNavCSS("2px","#000000");
        this.addSummaryCSS();
        
    }
    addButtonCSS(width,height){
        let button_menu=document.getElementById('menu_img_'+this.name_container);
        button_menu.style.width=width;
        button_menu.style.height=height;
    }
    addSummaryCSS(){
         this.addCSSRule(document.styleSheets[0], 'summary::-webkit-details-marker', "display: none",1);
    }
    addMenuCSS(){
        let menu=document.getElementById(this.name_container);
        menu.style.display="block";
        menu.style.zIndex=this.z_index;
        menu.style.position="absolute";
    }
    addNavCSS(border_size,color){
        let nav_menu=document.getElementById('nav_menu_'+this.name_container);
        nav_menu.style.display="none";
        nav_menu.style.width="100%";
        nav_menu.style.border="solid "+border_size+" "+color;
        nav_menu.style.borderRadius="5px";
    }
    addUlCSS(ul_id,position){
        let ul_menu=document.getElementById(this.element[ul_id]);
        ul_menu.style.overflow="hidden";
        ul_menu.style.listStyle="none";
        ul_menu.style.padding="0";
        ul_menu.style.margin="0";
        ul_menu.style.textAlign="center";
        console.log ("ul_id ",ul_id);
        console.log ("ul_menu.style.listStyle ",ul_menu.style.listStyle);
        
    }   
    addLiCSS(li_id,position){
        let li_menu=document.getElementById(li_id);
        li_menu.style.borderBottom="solid 1px #000000";
        li_menu.style.padding="10px";
        li_menu.style.textTransform="uppercase";
        if (position>0){
            li_menu.style.borderBottom="solid 0px #000000";
            li_menu.style.fontSize="80%";
            li_menu.style.fontWeight="normal";
            
        }else{
            
            li_menu.style.fontSize="120%";
            li_menu.style.textTransform="uppercase";
            li_menu.style.fontWeight="bold";
        }
    }
    getPosition(dict_options){
        let position=0;
        let list_options=dict_options.elements;
        if (dict_options.parent!="undefined" && dict_options.parent!=null){
           position=this.element_position[dict_options.parent]+1;
        }
        return position;
    }
    addPrincipalEvent(){
        let botton_menu=document.getElementById('menu_img_'+this.name_container);
        botton_menu.addEventListener("click", ()=>{this.activeMenu()});
    }
    
    insertOptions(dict_options,parent){
        let position=this.getPosition(dict_options);
        let list_options=dict_options.elements;
        let ul_id='nav_menu_ul';
        if (position>0){
            ul_id=ul_id+parent.split("nav_menu_li_option")[1]+"_"+position;
        }else{
            ul_id=ul_id+"_"+position;
        }
        let total_options="<ul id='"+ul_id+"'>";
        this.element["ul_"+parent]=ul_id; 
        for (let i=0;i<list_options.length;i++){
            let id=parent+"_"+i;
            total_options=total_options+'<li id="'+id+'" ><p><span >'+list_options[i]+'</span></p></li>';
            this.element_position[list_options[i]]=position;
            this.element[list_options[i]]=id; 
        }
        
        return total_options
    }
    addOptions(dict_options){
        // {"elements":[],"parent":null or undefined}
        let parent="";
        if (dict_options.parent=="undefined" || dict_options.parent==null ){
            //principal options
            parent="nav_menu_li_option";
            let nav_ul_menu=document.getElementById('nav_menu_'+this.name_container);
            nav_ul_menu.innerHTML=this.insertOptions(dict_options,parent)+'</ul>';
        }else{
            parent=this.element[dict_options.parent];
            let li_parent=document.getElementById(parent);
            let new_li="<details><summary>"+li_parent.innerHTML+"</summary>";
            new_li=new_li+this.insertOptions(dict_options,parent)+'</ul></details>';
            li_parent.innerHTML=new_li;
        }
        let ul_id="ul_"+parent;
        this.addUlCSS(ul_id,this.getPosition(dict_options));
        let list_options=dict_options.elements;
        for (let i=0;i<list_options.length;i++){
             this.addLiCSS(this.element[list_options[i]],this.getPosition(dict_options));
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
