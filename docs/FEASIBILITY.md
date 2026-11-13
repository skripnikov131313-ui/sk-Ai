# Feasibility: выбор движка

Дата проверки: 2026-11-13.

## WebView2

Официальная документация Microsoft рекомендует Evergreen для большинства приложений: общий runtime, автообновление вместе с Edge и меньше места на диске. Windows 11 обычно уже содержит runtime. Но приложение всё равно зависит от Microsoft WebView2 Runtime. Fixed Version даёт контроль версии, однако runtime нужно обновлять самостоятельно и он добавляет более 250 МБ.

## CEF

CEF публикует бинарные ветви, основанные на определённых версиях Chromium. На момент проверки опубликованные Windows-бинарники требуют VS2022/Windows SDK; пакет x64 около 348 МБ без символов. CEF может запаздывать за выпуском Chromium, значит проекту нужны собственный цикл обновления движка, regression проверки и поддержка установщика.

## Предварительный выбор

Если автономность означает движок без требования установленного runtime, CEF ближе к требованию, но добавляет вес и ответственность за своевременные security updates. Если низкое потребление диска и обновления на Windows важнее, WebView2 проще, но это Microsoft runtime. Решение только после native-spike на реальном железе и уточнения продуктового смысла «самостоятельный».

## Среда сборки

У текущей Windows-машины нет обнаруженных CMake/MSVC/Windows SDK/Ninja. Не проводилась установка системных инструментов. GitHub Actions Windows runner может дать воспроизводимую удалённую сборку после подключения GitHub Actions и решения billing/limits.

## Источники

- [Microsoft Learn: Evergreen vs. fixed WebView2](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/evergreen-vs-fixed-version)
- [Microsoft Learn: WebView2 distribution](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution)
- [CEF: branches and building](https://github.com/chromiumembedded/cef/blob/master/docs/branches_and_building.md)
- [GitHub Actions: Windows hosted runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)
