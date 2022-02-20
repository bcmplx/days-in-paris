const errorCatch = require('../services/error');
const fetch = require('node-fetch');
const db = require('../database');

//Constructeur qui cree un modele Event
class Event {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

	static async findAllHere(event){
		try {
			console.log("ligne 15", event)
			let events_info2 = await fetch(
				`https://places.ls.hereapi.com/places/v1/discover/explore?at=48.8634%2C2.3377&cat=${event}&apiKey=pSp61gPzAgERYwx-NUlc6OqphGKswuy1WWp3BccHQ98`
			).then(value => value.json());
				console.log("ligne 19", events_info2)
				return events_info2
					
		} catch (error) {
			errorCatch(error)
		}
	}

	static async findHere(){
		try {
			console.log("ligne 29 : findHere method")
			let events_info = await fetch(
				'https://places.ls.hereapi.com/places/v1/discover/explore?at=48.8634%2C2.3377&cat=sights-museums&apiKey=pSp61gPzAgERYwx-NUlc6OqphGKswuy1WWp3BccHQ98'
			).then(value => value.json());
				console.log("ligne 33", events_info.results.items)	
				return events_info
					
		} catch (error) {
			errorCatch(error)
		}
	}

	static async findFlickrPhotos(events) {
        try {
			console.log('ligne 42, PexelPhotos : ', events[0].title)
            const photos = async () => {



                const newTab =  await Promise.all(events.map(el => {
					console.log(el.title)
					const titre = el.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
					

					return new Promise(                     
						(resolve, reject) => {                         
							resolve(                               
								fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4138a369868bc3748d92be4aba39f880&tags=${titre}&per_page=1&page=1&format=json&nojsoncallback=1
								`)
								  
								.then(data => {   
									
									let result = data.json();
									console.log(result)
									
									})
								.then(data => {   
								
									return data.json()
									
									})
								
							
							)
						})

                }))

				 console.log("ligne 76", newTab[1])
                // console.log('ligne 74', newTab[0].photos[0].src.large)
                return newTab.map(element => {
					// console.log(element)
					if (element.photos[0]?.src?.large) {
						return element.photos[0].src.large
					}
					else {
						if (newTab[0].photos[0]?.src?.large) {
							return newTab[0].photos[0].src.large
						}
						else {
							return newTab[6].photos[0].src.large
						}
						
					}
					
				})
                

            }
			console.log("fin photos()")
			// console.log(photos())
            return photos()
             
        } catch (error) {
			console.log(error)
            errorCatch(error)
        }
    }

	static async findPexelPhotos(events) {
        try {
			console.log('ligne 42, PexelPhotos : ', events[0].title)
            const photos = async () => {



                const newTab =  await Promise.all(events.map(el => {
					console.log(el.title)
					const titre = el.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
					

					return new Promise(                     
						(resolve, reject) => {                         
							resolve(                               
								fetch(`https://api.pexels.com/v1/search?query=${titre}&per_page=1`,{
									headers: {
									//   Authorization: "563492ad6f917000010000012ecdbe705d0644aa989cde8b8d7cb8f2"
									  Authorization: "563492ad6f917000010000014f316b8398e0433a9afb4aa65d1d0224"
									//   Authorization: "563492ad6f91700001000001f771bfef746f4150b1f4a7a5a4f5d7db"

									}
								  })
								  
								.then(data => {   
									
									return data.json()
									
									})
								
							
							)
						})

                }))

				 console.log("ligne 76", newTab[1])
                // console.log('ligne 74', newTab[0].photos[0].src.large)
                return newTab.map(element => {
					// console.log(element)
					if (element.photos[0]?.src?.large) {
						return element.photos[0].src.large
					}
					else {
						if (newTab[0].photos[0]?.src?.large) {
							return newTab[0].photos[0].src.large
						}
						else {
							return newTab[6].photos[0].src.large
						}
						
					}
					
				})
                

            }
			console.log("fin photos()")
			// console.log(photos())
            return photos()
             
        } catch (error) {
			console.log(error)
            errorCatch(error)
        }
    } 

    //Fonction asynchrone qui renvoie toutes les activites 
static async findAll(){
	try {
		let events_info = await fetch(
			'https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI'
		).then(value => value.json());
			
			let typesArray = [];
			let result = [];
			
			events_info.results.forEach(element => {
				typesArray.push(element.types);
				typesArray.forEach(el => {                  
					el.forEach(data => {
						result.push(data)
					}) 
				})
			});
			let uniqueTypes = [...new Set(result)]    
			return {events_info, uniqueTypes}
				
	} catch (error) {
		errorCatch(error)
	}
}

    //Fonction asynchrone qui renvoie la page uivante des points d'interet
static async findAllNextPage(nextpage){
	try {
		let events_info = await fetch(
			'https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='
			+ nextpage
		).then(value => value.json());
						
		return events_info

	} catch (error) {
		errorCatch(error)
	}
}

    //Fonction asynchrone qui renvoie toutes les activites filtrees par categories (+ la page suivante)
    static async findWithFilter(cat, nextpage){
        try {
 
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest+'+ cat +'&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='+ nextpage).then(value => value.json());


            return events_info

        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie toutes les activites filtrees par categories et mot cles entres pas l'utilisateur (+ la page suivante)
    static async findByCatAndInput(cat, input, nextpage){
        try {
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest+'+ input + '+'+ cat +'&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='+ nextpage).then(value => value.json());


            return events_info
        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui ajoute la valeur a chaque activite si elle n'est pas definie
    static async addValues(content){
        try {
            content.results.forEach(el => {
                if(el.user_ratings_total) {
                    return el
                }
                else {
                    el.user_ratings_total = 0;
                    el.rating = 0
                    return el
                }
            })
            return content
        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie les photos des activites
    static async findPhotos(events) {
        try {

            const photos = async () => {

                const newTab = await Promise.all(events.map(el => {

                    if (el.photos){
                        return new Promise(                     
                            (resolve, reject) => {                         
                                resolve(                               
                                    fetch(
										`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
											el.photos[0].photo_reference
										}&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI`
									)
                                    .then(data => {   
                                        return data.url})
                                )
                            })
                    }
                    else {
                        return "No photo available for this event"
                    }
                }))
                
                return newTab
            }
            return photos()
             
        } catch (error) {
            errorCatch(error)
        }
    } 


    //Fonction asynchrone qui renvoie les activites Live Shows
    static async findLiveShows(event){

        try {
            let events_info = await fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=20&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&refine.category='+ event + '+').then(value => value.json());
            

            let array = events_info.records.map(el => {
                console.log(el.fields.lat_lon)
                if (el.fields.lat_lon){
                    return {
                        formatted_address: el.fields.address_street + ' ' + el.fields.address_zipcode+ ' ' + el.fields.address_city,
                        adress_name: el.fields.address_name,
                        geometry: {
                            location: {
                                lat: el.fields.lat_lon[0],
                                lng: el.fields.lat_lon[1]
                            }
                        },
                        name: el.fields.title,
                        short_description: el.fields.lead_text
                    }
                }
                else {
                    return {
                        formatted_address: el.fields.address_street + ' ' + el.fields.address_zipcode+ ' ' + el.fields.address_city,
                        adress_name: el.fields.address_name,
                        name: el.fields.title,
                        short_description: el.fields.lead_text  
                }
                
                        
                    
                }
            })
            let photos = events_info.records.map(el => {
                return el.fields.cover_url
            })


            console.log(array)             
            return {
                events: {
                    results: array
                }, 
                photos
            }; 
                   
        } catch (error) {
            errorCatch(error)
        }
    }  

    //Fonction asynchrone qui ajoute une categorie dans une activite
    static async addCategory(cat, user) {
        try { 
            const preparedQuery = {
                text: `INSERT INTO "activity"(api_activity_id, used_activity, start_date, end_date, user_info_id) VALUES($1, $2, $3, $4, $5)`,
                values: [cat.id, cat.used, user.id]
            }
            const {rows} = await db.query(preparedQuery)
        } catch (error) {
            errorCatch(error)
        }
    } 
}

module.exports = Event;