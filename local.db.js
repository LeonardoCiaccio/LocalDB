/* 1.0.0.4 leonardo.ciaccio@gmail.com

	Nome db + sign + nome tabella = "Negozio-Clienti" ; "Negozio-"
	
	CODICI DI ERRORE : 
	
		1 : Si sta aggiungendo un valore che deve essere univoco e non lo è
		2 : Si sta tentando di aggiornare un record senza id '#' o con univoco errato		
		3 : Durante la rimozione alcuni records non sono stati trovati
		4 : Si sta muovendo un elemento verso un indice inesistente
		5 : Non si riesce a trovare l'indice del record da muovere
		6 : Si vuole spostare un record sullo stesso indice reale
		
		100 : Errore di decrittazzione mentre si preleva il db
		101 : Errore di crittazzione mentre si salva il db

*/



( function(){
	
	"use strict";
	
/// --> Opzioni di classe
	
// --> Delimitatore di tabelle
	
	var sign 	 = "-"
		
		,options = {
			
		// --> Potrebbe anche essere sessionStorage
		
			storage  : localStorage
			
		// --> Il nome del database
			
			,name 	 : "MyDB"
			
		// --> Errore generico
			
			,onerror : function( number ){}
			
		// --> Chiamata ogni volta che ci sono variazioni
			
			,change  : function( tablename, recordschanged, eventname, mytableobj ){}  
			
		// --> Incapsula un processo di cifratura
			
			,encrypt : function( decrypted, mypass ){
				
				return decrypted; 
			
			} 
			
		// --> Incapsula un processo di decifratura
			
			,decrypt : function( encrypted, mypass ){ 
				
				return encrypted; 
			
			}
			
		};
	
/// --> Strumenti di classe
	
	var tools = { // --> tools
		
	// --> Controlla che un record sia univoco in una tabella
		
		isUnique : function( table, record ){
			
			return ( !record.unique || record.unique == "" || table.every( function( element, index, array ){
				
				return ( !element.unique || element.unique != record.unique );
				
			} ) );
			
		} // <-- isUnique
		
		,
		
	// --> Aggiorna i dati dello storage
		
		setDBtable	  : function( tablename, data ){
			
			var storage  = options.storage
				
				,db 	 = options.name
			
				,encrypt = options.encrypt;
			
			data = data || [];
			
			var name = db + sign + tablename;
			
		// --> Ad ogni modo sovrascrivo se non ci sono errori
			
			try{
				
				var encrypted = encrypt( JSON.stringify( data ) ) || JSON.stringify( data );
			
				storage[ name ] = encrypted;
			
				return true;
				
			}catch( e ){
				
				return false;	
				
			}
												
		} // <-- getDB
		
		,
		
	// --> Preleva i dati dallo storage
		
		getDBtable	  : function( tablename ){
			
			var storage  = options.storage
				
				,db 	 = options.name
			
				,decrypt = options.decrypt
			
				,name	 = db + sign + tablename;
			
		// --> Potrei non avere la tabella
			
			if( typeof storage[ name ] === "undefined" )return [];
			
			try{
				
				var decrypted = decrypt( storage[ name ] ) || storage[ name ];
			
				return JSON.parse( decrypted );	
				
			}catch( e ){
				
				try{
					
					return JSON.parse( storage[ name ] );	
					
				}catch( e ){
					
					return null;
					
				}				
				
			}
			
		} // <-- getDB
		
		,
		
	 // --> Aggiorna un oggetto con dei nuovi valori
		
		deepMerge : function( to, from ){
			
			for ( var key in from) {
				
				try {
					
				// --> Compatibile con Firefox
					
					if ( from[ key ].constructor == Object ){
						
						to[ key ] = deepMerge( to[ key ], from[ key ] );

					}else{
						  
						to[ key ] = from[ key ];

					}

				}catch( e ){
					  
					to[ key ] = from[ key ];

				}
			}

			return to;
			
		} // <-- deepMerge
		
	}; // <-- tools;
	
/// --> La variabile globale con cui lavorare
	
	var localdb = function( newoptions ){
			
	// --> Se ho l'oggetto adeguato aggiorno le opzioni
		
		if( typeof newoptions == "object" )tools.deepMerge( options, newoptions );
		
	// --> Se per errore resetto lo storage lo riporto al local
		
		if( newoptions.storage != localStorage && newoptions.storage != sessionStorage ){
			
			options.storage = localStorage;
		
		}else{
			
			options.storage = newoptions.storage;
			
		}
		
	// --> Il nome del db è obbligatorio
		
		if( typeof options.name !== "string" || options.name == "" )throw new Error( "Name of db is required !" );
		
	// --> L'evento onerror deve essere una funzione
		
		if( typeof options.onerror !== "function" )throw new Error( "Onerror need function !" );
		
	// --> L'evento change deve essere una funzione
		
		if( typeof options.change !== "function" )throw new Error( "Change need function !" );
		
	// --> Potrei avere problemi se non gestito bene
		
		if( typeof options.encrypt !== "function" )throw new Error( "Encrypt need function !" );
		
		if( typeof options.decrypt !== "function" )throw new Error( "Decrypt need function !" );
						
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
	
/// --> Aggiungo record ed eseguo un callback alla fine
	
	localdb.prototype.add = function( tablename, records, then ){
		
		if( !tablename )throw new Error( "localdb.prototype.add : Table name required !" );
		
		records = ( Array.isArray( records ) ) ? records : [ records ]; 
		
		if( typeof then !== "function" )then = function(){};
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
				
	// --> Mi faccio un giro per ogni record
		
		var myerr 	    = 0
		
			,newrecords = [];
		
		for( var i = 0; i < records.length; i++ ){
			
			var record = records[ i ];
			
		// --> Potrei avere un valore unique, devo controllare
		
			if( !tools.isUnique( mytable, record ) ){
				
				myerr = 1;
				
				continue;
				
			}

		// --> Aggiungo l'ID consecutivo al record

			var newrecord = tools.deepMerge( record, { "#" : this.getNextID( tablename ) } ); 

		// --> Aggiungo il record alla tabella

			mytable.push( newrecord );
			
			newrecords.push( newrecord );
			
		} // <-- forEach
				
	// --> Inserisco la tabella nel database
		
		var response = tools.setDBtable( tablename, mytable );
		
		if( !response )return options.onerror( 101 ) || false;
		
	// --> Eseguo il callback con la tabella
		
		then( myerr, newrecords );
		
	// --> Eseguo l'evento change con i records in questione
		
		options.change( tablename, newrecords, "add", mytable );
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
	
/// --> Aggiorno un record
	
	localdb.prototype.update = function( tablename, records, then ){
		
		if( !tablename )throw new Error( "localdb.prototype.update : Table name required !" );
		
		records = ( Array.isArray( records ) ) ? records : [ records ]; 
		
		if( typeof then !== "function" )then = function(){};
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
				
	// --> Un ciclo per aggiornare
		
		var updated = []
		
			,count	= 0;
		
		for( var i = 0; i < mytable.length && count < records.length; i++ ){
			
			for( var ii = 0; ii < records.length; ii++ ){
				
				var record = records[ ii ];
				
				if( mytable[ i ][ "#" ] == record[ "#" ] ){
					
					count++;
					
				// --> Ok, ma se l'unique è diverso non si va avanti, inizio con il clonare il db
					
					var mytablecloned = mytable.slice();
					
				// --> Rimuovo l'oggetto in esame e vedo se esiste un unique simile
					
					mytablecloned.splice( i, 1 );
					
					if( !tools.isUnique( mytablecloned, record ) )continue;

					mytable[ i ] = tools.deepMerge( mytable[ i ], record );
					
					updated.push( mytable[ i ] );
					
				}
				
			} // <-- for records
			
		} // <-- for mytable
		
	// --> Inserisco la tabella nel database
		
		var response = tools.setDBtable( tablename, mytable );
		
		if( !response )return options.onerror( 101 ) || false;
		
	// --> Eseguo il callback con la tabella
		
		then( ( updated.length == records.length ) ? 0 : 2, updated );
		
	// --> Eseguo l'evento change con il record in questione
		
		options.change( tablename, updated, "update", mytable );
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
	
/// --> Effettuo una ricerca nel database
	
	localdb.prototype.remove = function( tablename, ids, then ){
		
		if( !tablename )throw new Error( "localdb.prototype.remove : Table name required !" );
		
		ids = ( Array.isArray( ids ) ) ? ids : [ ids ]; 
		
		if( typeof then !== "function" )then = function(){};
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
		
	// --> Un ciclo per rimuovere
		
		var deleted = [];
		
		for( var i = 0; i < ids.length; i++ ){
				
		// --> Devo trovare l'indice array nella tabella

			var index = mytable.findIndex( function( record ){
				
				return ( record[ "#" ] == ids[ i ] );
				
			} );
			
			deleted.push( mytable[ index ] );

			mytable.splice( index, 1 );


		} // <-- for ids
		
	// --> Inserisco la tabella nel database
		
		var response = tools.setDBtable( tablename, mytable );
		
		if( !response )return options.onerror( 101 ) || false;
		
	// --> Eseguo il callback con la tabella
		
		then( ( deleted.length == ids.length ) ? 0 : 3, deleted );
		
	// --> Eseguo l'evento change con il record in questione
		
		options.change( tablename, deleted, "remove", mytable );
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;	
		
	};
	
/// --> Sposto un record in una nuova posizione
	
	localdb.prototype.move = function( tablename, idfrom, idto, then ){
		
		if( !tablename )throw new Error( "localdb.prototype.move : Table name required !" );
		
		if( !( idfrom > -1 ) || !( idto > -1 ) )throw new Error( "localdb.prototype.move : ID required !" );
		
		if( typeof then !== "function" )then = function(){};
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
		
	// --> Mi Assicuro che le posizioni sia intercambiabile
		
		var to = mytable.findIndex( function( record ){

			return ( idto == record[ "#" ] );

		} );
		
		if( to < 0 ){
			
			then( 4, null );
			
			return false;
			
		}
		
	// --> Devo conoscere l'indice effettivo del record
		
		var from = mytable.findIndex( function( record ){

			return ( idfrom == record[ "#" ] );

		} );
		
		if( from < 0 ){
			
			then( 5, null );
			
			return false;
			
		}
		
		if( from == to ){
			
			then( 6, null );
			
			return false;
			
		}
		
	// --> Sposto il record
		
		var moved = mytable.splice( from, 1 );
		
		mytable.splice( to, 0, moved[ 0 ] );
		
	// --> Inserisco la tabella nel database
		
		var response = tools.setDBtable( tablename, mytable );
		
		if( !response )return options.onerror( 101 ) || false;
		
	// --> Eseguo il callback con la tabella
		
		then( 0, moved );
		
	// --> Eseguo l'evento change con il record in questione
		
		options.change( tablename, moved, "move", mytable );
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
	
/// --> Sposto di posizione 2 record
	
	localdb.prototype.invert = function( tablename, idfrom, idto, then ){
		
		if( !tablename )throw new Error( "localdb.prototype.invert : Table name required !" );
		
		if( !( idfrom > -1 ) || !( idto > -1 ) )throw new Error( "localdb.prototype.invert : ID required !" );
		
		if( typeof then !== "function" )then = function(){};
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
		
	// --> Mi Assicuro che le posizioni sia intercambiabile
		
		var to = mytable.findIndex( function( record ){

			return ( idto == record[ "#" ] );

		} );
		
		if( to < 0 ){
			
			then( 4, null );
			
			return false;
			
		}
		
	// --> Devo conoscere l'indice effettivo del record
		
		var from = mytable.findIndex( function( record ){

			return ( idfrom == record[ "#" ] );

		} );
		
		if( from < 0 ){
			
			then( 5, null );
			
			return false;
			
		}
		
		if( from == to ){
			
			then( 6, null );
			
			return false;
			
		}
		
	// --> Sposto i records
		
		var movedfrom, movedto;
		
		if( from > to ){
			
			movedfrom = mytable.splice( from, 1 );
			
			movedto   = mytable.splice( to, 1 );
			
			mytable.splice( to, 0, movedfrom[ 0 ] );
			
			mytable.splice( from, 0, movedto[ 0 ] );
			
		}else{
			
			movedto   = mytable.splice( to, 1 );
			
			movedfrom = mytable.splice( from, 1 );
			
			mytable.splice( from, 0, movedto[ 0 ] );
			
			mytable.splice( to, 0, movedfrom[ 0 ] );
			
		}
		
		
		
	// --> Inserisco la tabella nel database
		
		var response = tools.setDBtable( tablename, mytable );
		
		if( !response )return options.onerror( 101 ) || false;
		
	// --> Eseguo il callback con la tabella
		
		then( 0, [ movedfrom, movedto ] );
		
	// --> Eseguo l'evento change con il record in questione
		
		options.change( tablename, [ movedfrom, movedto ], "invert", mytable );
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
	
/// --> Effettuo un giro in una tabella
	
	localdb.prototype.query = function( tablename, condition, opt ){
		
		if( !tablename )throw new Error( "localdb.prototype.query : Table name required !" );
		
		if( typeof condition !== "function" )condition = function(){ return true; };
		
		if( !opt )opt = {};
		
		opt.offset = ( !opt.offset ) ? 0 : ( parseInt( opt.offset ) > 0 ) ? parseInt( opt.offset ) : 0;
		
		opt.limit = ( !opt.limit ) ? -1 : ( parseInt( opt.limit ) > 0 ) ? parseInt( opt.limit ) : -1;
		
		if( opt.sort !== "disc" )opt.sort = "asc";
		
		//if( !opt.sortby )opt.sortby = "#";
		
		var response = [];
		
	// --> Prelevo la tabella, potrebbe essere []
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || [];
		
		var originaltable = mytable.slice();
		
	// --> Organizzo i dati per come richiesti
		
		if( opt.sortby && typeof opt.sortby === "string" ){
			
			if( opt.sort == "asc" ){
				
				mytable.sort( function( a, b ){

					if( typeof a[ opt.sortby ] === "string" && typeof b[ opt.sortby ] === "string" ){

					// --> Per i caratteri non ascii
						
						return a[ opt.sortby ].localeCompare( b[ opt.sortby ] );

					}

					return ( parseInt( a[ opt.sortby ] ) - parseInt( b[ opt.sortby ] ) );

				} );

			}else{

				mytable.sort( function( a, b ){

					if( typeof a[ opt.sortby ] === "string" && typeof b[ opt.sortby ] === "string" ){

					// --> Per i caratteri non ascii
						
						return b[ opt.sortby ].localeCompare( a[ opt.sortby ] );

					}

					return ( parseInt( b[ opt.sortby ] ) - parseInt( a[ opt.sortby ] ) );

				} );

			} // <-- if asc
			
		} // <-- if sortby
				
	// --> Un ciclo per la ricerca
				
		for( var i = opt.offset; i < mytable.length && ( opt.limit < 0 || i < opt.limit ); i++ ){
		
			var record = mytable[ i ];
			
			if( condition( record ) === true )response.push( record );
			
		}
		
		return response;
		
	};
	
/// --> Crypto tutto il mio db
	
	localdb.prototype.encryptdb = function( mypass ){
						
		var storage 	 = options.storage

			,teststorage = {};
		
	// --> Faccio un giro di prova per valutare che tutti i db si possano cifrare, altrimenti non cambio nulla

		for( var key in storage ){

			if( key.match( new RegExp( "^" + options.name , "g" ) ) ){

				try{

					var encrypted = options.encrypt( storage[ key ], mypass );

					if( !encrypted )return false;

					teststorage[ key ] = encrypted;

				}catch( e ){

					return false;

				}

			} // <-- if match

		} // <-- for storage

	// <-- Sembra tutto ok

		for( var key in teststorage ){

			storage[ key ] = teststorage[ key ];

		} // <-- for storage

		return true;
		
	};
	
/// --> Decrypto tutto il mio db
	
	localdb.prototype.decryptdb = function( mypass ){
						
		var storage      = options.storage

			,teststorage = {};

	// --> Faccio un giro di prova per valutare che tutti i db si possano decifrare, altrimenti non cambio nulla

		for( var key in storage ){

			if( key.match( new RegExp( "^" + options.name , "g" ) ) ){

			// --> Potrebbe essere in chiaro

				try{

					if( JSON.parse( storage[ key ] ) ){

						teststorage[ key ] = storage[ key ];

						continue;

					}

				}catch( e ){}

				try{

					var decrypted = options.decrypt( storage[ key ], mypass );

				// --> Faccio un test, potrebbe essere in chiaro

					if( !decrypted ){

						return false;

					}else if( JSON.parse( decrypted ) ){

						teststorage[ key ] = decrypted;

						continue;

					}else{

						return false;

					}								

				}catch( e ){

					return false;

				}

			} // <-- if match

		} // <-- for storage

	// <-- Sembra tutto ok

		for( var key in teststorage ){

			storage[ key ] = teststorage[ key ];

		} // <-- for storage

		return true;
		
	};
	
/// --> Restituisco il numero di record in una tabella
	
	localdb.prototype.countRecords = function( tablename ){
		
		if( !tablename )throw new Error( "localdb.prototype.countRecords : Table name required !" );
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
		
		return mytable.length;
		
	};
	
/// --> Restituisce l'ultimo id da settare
	
	localdb.prototype.getNextID = function( tablename ){
		
		if( !tablename )throw new Error( "localdb.prototype.getNextID : Table name required !" );
		
		var mytable = tools.getDBtable( tablename );
		
		if( !mytable )return options.onerror( 100 ) || false;
		
		return ( mytable.length > 0 ) 
			   ? mytable.sort( function( a, b ){

			   		return ( b[ "#" ] - a[ "#" ] );

			   } )[ 0 ][ "#" ] + 1 
			   : 0
		  	   ;
		
	};
	
/// --> Esporta il database
	
	localdb.prototype.export = function(){
						
		var storage   = options.storage

			,alltable = [];

	// --> Raccolgo tutte le tabelle di questo DB

		for( var key in storage ){

			if( key.match( new RegExp( "^" + options.name , "g" ) ) ){
				
				var table = {};
				
				table[ key ] = storage[ key ];
				
				alltable.push( table );

			} // <-- if match

		} // <-- for storage	
		
		if( alltable.length < 1 )return null;
		
		return JSON.stringify( alltable );
		
	};
	
/// --> Importa un db database
	
	localdb.prototype.import = function( alldb ){
						
		var storage      = options.storage;

	// --> Raccolgo tutte le tabelle di questo DB

		if( typeof alldb !== "string" )throw new Error( "localdb.prototype.import : require text format alldb" );
		
		try{
			
			var allmydb = JSON.parse( alldb );
			
			allmydb.forEach( function( table ){
				
				try{
					
					storage[ Object.keys( table ) ] = table[ Object.keys( table ) ];
					
				}catch( e ){}
				
			} );
			
			return true;
			
		}catch( e ){
			
			return false;
			
		}
		
	};
	
/// --> Rimuove tutto il database
	
	localdb.prototype.clear = function(){
						
		var storage   = options.storage;

	// --> Raccolgo tutte le tabelle di questo DB

		for( var key in storage ){

			if( key.match( new RegExp( "^" + options.name , "g" ) ) ){
				
				storage.removeItem( key );

			} // <-- if match

		} // <-- for storage	
				
	};
		
/// --> Rendo disponibile l'oggetto
	
	window.localdb = localdb;
	
} )();








