# Projekt - Ochrona Danych w Systemach Informatycznych
___


Aby uruchomić aplikację, należy wykonać komendę
```
docker compose up --build
```
Pobrane zostaną obrazy odpowiadające za wszystkie moduły aplikacji.
Po skomponowaniu całości, serwowane będą usługi pod następującymi adresami:
* https://localhost:3000/ - *frontend*
* https://localhost:8081/ - *backend*
* http://localhost:8080/ - *konsola serwisu autoryzującego*

Następnie, w swojej przeglądarce należy odwiedzić adresy frontendu (https://localhost:3000/) i backendu (https://localhost:8081/), akceptując certyfikaty którymi się legitymują - jest to krok konieczny, ze względu na fakt iż są one samopodpisane.

Aby zacząć krzystać z aplikacji, należy się zarejestrować. Po zarejestrowaniu, w sekcji *notes* pojawią się wszystkie notatki stworzone lub udostępnione 
użytkownikowi.

### Dodawanie notatki

Aby dodać notatkę, należy zamieścić jej treść w polu tekstowym *Content*. Notatki obsługują składnię markdown. Następnie, opcjonalnie można ją zaszyfrować
wpisując hasło i klikając *encrypt*. Następnie należy określić dostępność notatki - *private/shared/public*. W przypadku shared, po wpisaniu nazw
użytkowników, należy kliknąć *add* - dopisze ich to do listy dostępu do notatki. Finalnie, aby zapisać notatkę należy kliknąć *save*.
