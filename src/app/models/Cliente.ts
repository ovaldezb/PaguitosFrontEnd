
export class Cliente{
  constructor(
    public _id:string,
    public nombre:string,
    public telefono: string,
    public correoElectronico: string,
    public direccion: string,
    public isActive:boolean,
    public id?: string
  ){}
}