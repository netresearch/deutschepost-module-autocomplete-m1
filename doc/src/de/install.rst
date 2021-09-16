Installation und Konfiguration
==============================

Installation
------------------------------------

Installieren Sie das Modul gemäß der Anweisung in der Datei *README.md*, die Sie im
Modulpackage finden. Achten Sie darauf, alle Anweisungen exakt zu befolgen und keine
Schritte zu überspringen.

Bei der Installation werden keine Datenbank-Tabellen verändert oder Felder hinzugefügt,
da das Modul keine zusätzlichen Daten speichert.

Modulkonfiguration
------------------------------------

Die Konfigurations-Einstellungen finden Sie im |mage1| Adminpanel unter:

::

    Konfiguration → Kunden → Kunden Konfiguration → Deutsche Post Direkt Autocomplete

Im diesem Konfigurationsbereich können folgende Einstellungen vorgenommen werden:

- *Aktiviert (Enabled)*: Wählen Sie, ob das Modul aktiv sein soll.
- *Benutzername (Username)*: Geben Sie den Nutzernamen ein, den Sie von |dpdirekt| erhalten haben,
  siehe `Zugangsdaten`_.
- *Passwort (Password)*: Geben Sie das Passwort für den o.g. Nutzer ein.
- *Logging aktivieren (Logging enabled)*: Wenn aktiviert, wird die Kommunikation mit der
  *Datafactory Autocomplete* in ``var/log/postdirekt_autocomplete.log`` protokolliert. Beachten
  Sie, dass das allgemeine Logging unter *Erweitert → Entwickler → Log-Einstellungen* ebenfalls
  aktiviert sein muss.
- *Hausnummern Hinweis anzeigen (Enabled)*:  Wählen Sie, ob die Straßennummern-Infobox aktiviert werden soll.
- *Hausnummern Hinweistext (House number hint text)*: Geben Sie den Text ein, der als Infobox am Adress-Straßenfeld
  bei Adressvorschlagsauswahl angezeigt werden soll.

Das Modul verfügt nicht über einen Sandbox-Modus. Es sind in jedem Fall `Zugangsdaten`_ erforderlich.

|mage1| Konfiguration
------------------------------------

Es wird empfohlen, das Standardland des Shops auf Deutschland einzustellen, damit die Vervollständigung
von Adressen im Shop-Frontend funktioniert, ohne dass der Kunde zunächst das Land wählen muss (siehe auch
`Unterstützte Länder`_).

Wenn ein anderes Land eingestellt ist, erfolgt keine Vervollständigung der Adresse.
