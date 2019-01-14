Feature: entries saved and retrieved

   entries saved and retrieved
Scenario: Save an entry an then retrieve it
Given Server is up
When we use the api to save a new entry:
   |ID|TITLE|
   |test1|test1|
   Then we can retrieve it using the api