# Testet — Prova 1

| Testi | Rezultati i pritur | Rezultati real |
|---|---|---|
| Tri karta | Titujt dhe kategoritë përputhen me variantin | Shfaqen Teleskopi, Uji, Energjia, secila me "Kategoria: Shkencë" |
| Menuja Programi / Info | Çdo lidhje ka seksionin e vet objektiv | `#programi` dhe `#info` ekzistojnë në faqe; lidhjet çojnë te seksionet |
| Detaje në secilën kartë | Hap seksionin #info | Të tria lidhjet Detaje kanë `href="#info"` dhe çojnë te "Informata" |
| Gjerësia 360 px | Një kolonë, pa scroll horizontal | Kartat njëra nën tjetrën; gjerësia e faqes 345px ≤ 360px, pa scroll horizontal |
| Gjerësia 1000 px | Tri kolona | Tri karta krah për krah në të njëjtin rresht |
| Tekst i gjatë në kartë | Përmbajtja qëndron brenda në 360 px | Teksti `AktivitetStudentorPaHapesira…` thyhet në disa rreshta dhe qëndron brenda kartës; pastaj u hoq |
| Tastiera Tab dhe Enter | Fokusi shihet; Enter aktivizon lidhjen | Lidhja e fokusuar merr kornizë blu 3px; Enter e hap lidhjen (sjellje e zakonshme e `<a href>`) |
