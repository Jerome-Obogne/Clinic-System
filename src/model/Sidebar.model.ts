
type SideBarDataModel = { 
    id:number,
    title:string, 
    routes: string, 
    icon : React.ReactNode,
}

type SideBarRecord = {
  Doctor: SideBarDataModel[],
  Patient: SideBarDataModel[]
};

type SideBarModel = {
  sideBarList: SideBarRecord;
  userType: 'Doctor' | 'Patient';
  children?: React.ReactNode
};

export type { SideBarModel };