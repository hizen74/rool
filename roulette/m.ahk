; Script AutoHotkey pour accéder à une page web déjà ouverte en appuyant sur "M"
M::
SetTitleMatchMode, 2 ; Permet de faire correspondre une partie du titre de la fenêtre
IfWinExist, file:///D:/roulette/index.html - Microsoft Edge ; Remplacez "Microsoft Edge" par le nom de votre navigateur
{
    WinRestore ; Restaure la fenêtre si elle est minimisée
    WinActivate ; Active la fenêtre
}
else
{
    MsgBox, La page n'est pas ouverte.
}
return
