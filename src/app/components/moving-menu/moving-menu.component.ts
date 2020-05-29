import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-moving-menu',
  templateUrl: './moving-menu.component.html',
  styleUrls: ['./moving-menu.component.css']
})
//Компонент шапки сайта
export class MovingMenuComponent implements OnInit {
  //Декоратор, оповещающий об открытии или скрытии бокового меню
  @Output() onChanged = new EventEmitter<boolean>();

  constructor(public router: Router) {
    let lineMenuItems: any = null;  //Навигационные элементы
    let current: any = null;  //Текущий нав. элемент

    //Установка текущего навигационного элемента
    router.events.subscribe((event: RouterEvent) =>{
      if(event instanceof NavigationEnd){
        lineMenuItems = document.getElementsByClassName("line_menu_item");
        current = document.getElementsByClassName("current")[0];

        if( current ){
          current.classList.remove("current");
        }

        switch (router.url) {
          case "/home":
            lineMenuItems[0].classList.add("current");
            break;
          case "/shop":
            lineMenuItems[1].classList.add("current");
            break;
          case "/about-us":
            lineMenuItems[2].classList.add("current");
            break;
          case "/contacts":
            lineMenuItems[3].classList.add("current");
            break;
          default:
            break;
        }

      }
    });
  }

  ngOnInit() {
  }

  //Метод для открытия или скрытия бокового меню
  showOrHideMenu(){
    let movingMenu: any = document.getElementsByClassName("moving_menu")[0];
    let curtain: any = document.getElementsByClassName("curtain")[0];
    let lineHeader: any = document.getElementsByClassName("line-header")[0];
    let icon: any = document.getElementsByClassName("icon")[0];

    if(movingMenu.classList.contains("show")){
      movingMenu.classList.remove("show");
      lineHeader.classList.remove("moved");
      curtain.classList.remove("on");
      curtain.classList.add("off");
      icon.classList.remove("cross");
      icon.classList.add("burger");
    } else {
      movingMenu.classList.add("show");
      lineHeader.classList.add("moved");
      curtain.classList.remove("off");
      curtain.classList.add("on");
      icon.classList.remove("burger");
      icon.classList.add("cross");
    }

    this.onChanged.emit();
  }

}
