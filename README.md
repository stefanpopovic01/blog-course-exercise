# MyBlog - Mini Blog Platform


MyBlog je jednostavna full-stack blog platforma napravljena u **React + Vite** za frontend i **Node.js + Express + MongoDB** za backend.  
Omogućava korisnicima da pregledaju postove, dodaju nove, i upravljaju sopstvenim sadržajem. Admin ima dodatne privilegije nad svim korisnicima i postovima.

---

## Trenutno implementirane funkcionalnosti

### Backend
- **Autentifikacija**: registracija i login korisnika sa JWT tokenima
- **CRUD postova**:
  - Kreiranje novog posta
  - Prikaz svih postova
  - Edit i delete postova (samo za autora ili admina)
- **Middleware**:
  - `authMiddleware` za proveru da li je korisnik logovan
  - `authorizationPost` za proveru prava nad postom

### Frontend
- **Header** sa Login i Register opcijama
- **Home stranica** koja prikazuje sve postove iz baze
- **SinglePost komponenta** sa opcijama Edit i Delete (uslovno prikazano po rolama)
- **AddPost komponenta** (forma koja se pojavljuje preko Add Post dugmeta)
- **EditPost komponenta** (forma za izmenu postojećeg posta)
- **Uslovno renderovanje** dugmadi i opcija po JWT tokenu i roli korisnika
- **LocalStorage + AuthContext** za čuvanje tokena i korisnika globalno u aplikaciji

---

## Budući razvoj
- **Logout** dugme i logika
- **Pagination** na Home stranici
- **Profile stranica** za korisnika koja prikazuje njegove podatke i postove
- **Admin panel**:
  - Lista svih korisnika
  - Editovanje i upravljanje korisničkim podacima
- **Refresh token logika** za sigurniju autentifikaciju

---

## Tehnologije
- **Frontend**: React, Vite, React Router, Axios, Context API  
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt  
- **Stilovi**: CSS

---