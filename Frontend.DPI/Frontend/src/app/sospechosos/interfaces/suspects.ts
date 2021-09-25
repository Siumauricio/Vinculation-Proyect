export interface Suspects{
    dniSuspect:string;
    firstName: string;
    middleName: string;
    thirdName: string
    lastName:string;
    alias: string;
    sex: number;
    height?: number;
    weight?: number;
    eyesColor: string;
    build: string;
    personFrom: string;
    ocupattion: string
    passportNumber:string;
    particularSign: string;
    tattoo: string;
    operationPlace: string;
    dateOfBirth?:  Date,
    nationaliy: string
    age:number;
    civilStatus: string;
    colonia: string;
    lastModificationUser:string;
    street: string;
    avenue: string;
    village: string;
    caserio: string;
    houseNumber: number;
    pasaje: string;
    referenceAddress: string;
    department: string;
    municipio: string;
    deleted?:number,
    usernameRegistryData: string;
    departmentIdDepartment: number;
}

export const  Nacionalidades =  ["Afgano","Alemán","Árabe","Argentina","Australiana","Belga","Boliviana","Brasileña","Camboyana","Canadiense","Chilena","China","Colombiana","Coreana","Costarricense","Cubana","Danés","Dominicano","Ecuatoriano","Egipcio","Escocés","Español","Estadounidense","Estonio","Etíope","Filipina","Finlandés","Frances","Galés","Griego","Guatemalteco","Haitiano","Holandés","Hondureño","Indonés","Ingles","Iraní","Iraquí","Irlandés","Israelí","Italiana","Japonés","Jordana","Laosiana","Letón","Malaya","Marroquí","Mexicano","Neozelandés","Nicaragüense","Noruego","Panameña","Paraguayo","Peruana","Polaco","Portugués","Puertorriqueño","Rumano","Rusa","Salvadoreño","Sueca","Tailandesa","Taiwanesa","Turca","Ucraniana","Uruguaya","Venezolana","Vietnamita","No aplica"]
export const  Departamentos = ["Atlántida","Colón","Comayagua","Copán","Cortés","Choluteca","El Paraíso","Francisco Morazán","Gracias a Dios","Intibucá","Islas de la Bahía","La Paz","Lempira","Ocotepeque","Olancho","Santa Barbara","Valle","Yoro"];
export const Municipios  = {"Atlántida":["La Ceiba","Tela","Jutiapa","La Masica","San Francisco","Arizona","Esparta","El Porvenir"], 
                            "Colón": ["Trujillo","Balfate","Iriona","Limón","Sabá","Santa Fe","Santa Rosa de Aguán","Sonaguera","Tocoa","Bonito Oriental"],
                            "Comayagua":["Comayagua","Ajuterique","El Rosario","Esquías","Humuya","La libertad","Lamaní","La Trinidad","Lejamani","Meambar","Minas de Oro","Ojos de Agua","San Jerónimo","San José de Comayagua","San José del Potrero","San Luis","San Sebastián","Siguatepeque","Villa de San Antonio","Las Lajas","Taulabé"],
                            "Copán":["Santa Rosa de Copán","Cabañas","Concepción","Copán Ruinas","Corquín","Cucuyagua","Dolores","Dulce Nombre","El Paraíso","Florida","La Jigua","La Unión","Nueva Arcadia","San Agustín","San Antonio","San Jerónimo","San José","San Juan de Opoa","San Nicolás","San Pedro","Santa Rita","Trinidad de Copán","Veracruz"],
                            "Cortés":["San Pedro Sula","Choloma","Omoa","Pimienta","Potrerillos","Puerto Cortés","San Antonio de Cortés","San Francisco de Yojoa","San Manuel","Santa Cruz de Yojoa","Villanueva","La Lima"],
                            "Choluteca":["Choluteca","Apacilagua","Concepción de María","Duyure","El Corpus","El Triunfo","Marcovia","Morolica","Namasigue","Orocuina","Pespire","San Antonio de Flores","San Isidro","San José","San Marcos de Colón","Santa Ana de Yusguare"],
                            "El Paraíso":["Yuscarán","Alauca","Danlí","El Paraíso","Güinope","Jacaleapa","Liure","Morocelí","Oropolí","Potrerillos","San Antonio de Flores","San Lucas","San Matías","Soledad","Teupasenti","Texiguat","Vado Ancho","Yauyupe","Trojes"],
                            "Francisco Morazán":["Distrito Central","Alubarén","Cedros","Curarén","El Porvenir","Guaimaca","La Libertad","La Venta","Lepaterique","Maraita","Marale","Nueva Armenia","Ojojona","Orica","Reitoca","Sabanagrande","San Antonio de Oriente","San Buenaventura","San Ignacio","San Juan de Flores","San Miguelito","Santa Ana","Santa Lucía","Talanga","Tatumbla","Valle de Ángeles","Villa de San Francisco","Vallecillo"], 
                            "Gracias a Dios": ["Puerto Lempira","Brus Laguna","Ahuas","Juan Francisco Bulnes","Ramón Villeda Morales","Wampusirpe"],
                            "Intibucá":["La Esperanza","Camasca","Colomoncagua","Concepción","Dolores","Intibucá","Jesús de Otoro","Magdalena","Masaguara","San Antonio","San Isidro","San Juan","San Marcos de la Sierra","San Miguel Guancapla","Santa Lucía","Yamaranguila","San Francisco de Opalaca"],
                            "Islas de la Bahía":["Roatán","Guanaja","José Santos Guardiola","Utila"],
                            "La Paz":["La Paz","Aguanqueterique","Cabañas","Cane","Chinacla","Guajiquiro","Lauterique","Marcala","Mercedes de Oriente","Opatoro","San Antonio del Norte","San José","San Juan","San Pedro de Tutule","Santa Ana","Santa Elena","Santa María","Santiago de Puringla","Yarula"],
                            "Lempira":["Gracias","Belén","Candelaria","Cololaca","Erandique","Gualcince","Guarita","La Campa","La Iguala","Las Flores","La Unión","La Virtud","Lepaera","Mapulaca","Piraera","San Andrés","San Francisco","San Juan Guarita","San Manuel Colohete","San Rafael","San Sebastián","Santa Cruz","Talgua","Tambla","Tomalá","Valladolid","Virginia","San Marcos de Caiquín"],
                            "Ocotepeque":["Ocotepeque","Belén Gualcho","Concepción","Dolores Merendón","Fraternidad","La Encarnación","La Labor","Lucerna","Mercedes","San Fernando","San Francisco del Valle","San Jorge","San Marcos","Santa Fe","Sensenti","Sinuapa"],
                            "Olancho":["Juticalpa","Campamento","Catacamas","Concordia","Dulce Nombre de Culmí","El Rosario","Esquipulas del Norte","Gualaco","Guarizama","Guata","Guayape","Jano","La Unión","Mangulile","Manto","Salamá","San Esteban","San Francisco de Becerra","San Francisco de la Paz","Santa María del Real","Silca","Yocón","Patuca"],
                            "Santa Barbara":["Santa Bárbara","Arada","Atima","Azacualpa","Ceguaca","Concepción del Norte","Concepción del Sur","Chinda","El Níspero","Gualala","Ilama","Las Vegas","Macuelizo","Naranjito","Nuevo Celilac","Nueva Frontera","Petoa","Protección","Quimistán","San Francisco de Ojuera","San José de las Colinas","San Luis","San Marcos","San Nicolás","San Pedro Zacapa","San Vicente","Centenario","Santa Rita","Trinidad"],
                            "Valle":["Nacaome","Alianza","Amapala","Aramecina","Caridad","Goascorán","Langue","San Francisco de Coray","San Lorenzo"],
                            "Yoro":["Yoro","Arenal","El Negrito","El Progreso","Jocón","Morazán","Olanchito","Santa Rita","Sulaco","Victoria","Yorito"]};
export const EstadoCivil = ["Soltero","Casado","Divorciado","Separación en Proceso Judicial","Viudo","Concubinato"];