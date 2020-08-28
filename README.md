# 該如何跑起這個 server

## Requirement

Node.js >= 12

## Install dependencies

`npm install`

## Start the server

`npm run start`

By default it listen on port 3000, you can edit it at `.env` file.

## Run the unit test

`npm run test:cov`

# 專案的架構，API server 的架構邏輯

本專案使用 Nest.js 框架開發，`src` 目錄下的 `main.ts` 為啟動框架所需的基本檔案，`app.module.ts` 為整個專案的 root module，負責 import 底下各個 controller 及 service。  
在各個子資料夾內的 `*.spec.ts` 檔案則為該元件的單元測試檔案。

- `src/middleware`  
  `auth.middleware.ts`:  
  負責檢查 HTTP request header 的 Name 及 Password 欄位，透過 Hahow `/auth` API 檢查，並將結果寫入 request 物件的 authenticated 欄位。  
  若 header 沒有 Name 及 Password，authenticated 會被設為 false。  
  若 header 有 Name 及 Password，且正確通過驗證，authenticated 會被設為 true。  
  若 header 有 Name 或 Password，但驗證失敗，此 middleware 會直接回傳 HTTP 401。

- `src/hahow`  
  `hahow.service.ts`:  
  負責呼叫 Hahow API。

- `src/heroes`  
  `heroes.controller.ts`:  
  `/heroes` 的 controller 層程式碼。

  `heroes.service.ts`:  
  `/heroes` 的 service 層程式碼。

- `src/type`  
  自定義的 Typescript 型別定義檔。

# 你對於所有使用到的第三方 library 的理解，以及他們的功能簡介

- Nest.js  
  一套基於 Express 的後端框架，使用 Typescript，風格類似 Angular，大量使用依賴注入、裝飾器等抽象化的方式，以打造一個高彈性，可測試，低耦合的專案。
- Jest  
  Nest.js 預設使用的測試框架，本專案也使用來做單元測試使用。
- node-mocks-http  
  由於開發 middleware 的單元測試時需要傳入 Express 的 Request 及 Response 物件，此 library 提供產生 Mock Request 及 Response 物件的功能。

# 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解

大部分的情況我盡量以良好的程式架構，變數名稱，函數名稱等來取代註解，只有在遇到一些難以讓程式碼本身透過命名解釋意圖的複雜邏輯，或是難以用常理判斷的特殊業務邏輯我才會使用註解。  
本專案唯一的註解是 `hahow.service.ts` 中，由於 Hahow 提供的 `/heroes/:heroId` API 有時會有回傳異常的資料且發生頻率蠻高，但該行為及回傳格式在 API 文件並未提及，因此有幾行為了挑出此類回傳的程式碼有註解。

# 在這份專案中你遇到的困難、問題，以及解決的方法

整體來說並未遇到太複雜的問題，唯一的小問題是 `/heroes/:heroId` 這支 API 有時會有回傳異常的資料且發生頻率蠻高，因此對於這個 API 有幾行判斷式來檢查該錯誤是否有發生，由於該錯誤也只有說 "Backend error" 而沒有其他詳細資訊，因此在發生時我也只能先回傳 HTTP 500，但我覺得這邊的判斷其實並不完整，主要的原因是 API 文件並未提及發生錯誤的原因及錯誤時的資料格式，其他 API 也都沒有遇到這個情況，我覺得如果是真實的專案我會希望可以向對方確認這個 API 的完整規格，包含發生錯誤時的資料格式，各種錯誤的說明，以便幫整個負責呼叫該 API 的 service 寫一個完整的錯誤判斷流程。
