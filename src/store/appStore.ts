// This store should manage app-wide data
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type  { Page } from '@/interfaces/NOTypes.ts';
import {apiGetComments, apiPostComment} from '@/api/api';

export const useAppStore = defineStore('appStore', () =>{
  const pageComments = ref<any[]>([]);
  const screenWidth = ref<number>(0);
  const allPages = ref<Page[]>([]);

  const dataPages = computed<Page[]>(() => {
    return allPages.value.filter(p => p.type == 'data');
  })
  const nodePages = computed<Page[]>(() => {
    return allPages.value.filter(p => p.type == 'node');
  })
  const malazanPages = computed<Page[]>(() => {
    return allPages.value.filter(p => p.type == 'malazan');
  })

  function setScreenSize(width: number) {
    screenWidth.value = width;
  }

  async function getPageComments(pageID:number): Promise<void> {
    try {
        const res = await apiGetComments(pageID);
        pageComments.value = res;
        console.log(res);
    } catch (error){
        console.log('Error fetching data: ' + error);
    }
  }
  async function postComment(pageID:number, name:string, message:string): Promise<void> {
      try {
          const res = await apiPostComment(pageID, name, message);
          getPageComments(pageID);
      } catch (error){
          console.log('Error fetching data: ' + error);
      }

  }
  function savePages(pages:any[]):void {
    allPages.value = pages;
  }
// all variables and functions should be added here
  return {
    nodePages,
    dataPages,
    malazanPages,
    pageComments,
    screenWidth,
    allPages,
    setScreenSize,
    getPageComments,
    postComment,
    savePages
  }
});


