import { createSlice } from '@reduxjs/toolkit'

export const FileSlice = createSlice({
  name: 'File_save',
  initialState:{StoryId:{},check:false,update:false,bookmarkstory:false,reslog:false,name:"",addstory:false,yourstory:false},
  reducers: {
    update: (state,actions) => {
      if(state.addstory===false){
      state.StoryId=actions.payload
      state.check=actions.payload
      }
      
    },
    close_updates:(state)=>{
      state.StoryId={}
      state.check=false
      state.bookmarkstory=false
      state.reslog=false
      state.name=""
      state.addstory=false
      state.yourstory=false
     
    },
    new_update: (state,actions)=>{
      state.update=actions.payload
    },
    update_story: (state,actions) => {
      
      state.StoryId=actions.payload
      state.bookmarkstory=actions.payload
      
    },
    update_reslog:(state,actions)=>{
      state.reslog=true
      state.name=actions.payload
    },
    update_addstory:(state,actions)=>{
      state.addstory=true
      state.check=false
      state.StoryId=actions.payload
      console.log(state.StoryId)
    },
    update_yourstory:(state)=>{
      state.yourstory=true
    }
    
    
  }
})
export const { update,close_updates,new_update,update_story ,update_reslog,update_addstory,update_yourstory} = FileSlice.actions

export default FileSlice.reducer