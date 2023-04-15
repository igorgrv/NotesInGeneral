public class AccountController {

  public List<Account> insertAccounts (List<Account> accounts) {
    insert accounts;
    return accounts;
  }

  public Account insertAccount (Account account) {
    insert account;
    return account;
  }

  public Account getAccountById (Integer accountId) {
    return [SELECT Id, Name FROM Account WHERE Id = :accountId];
  }

  public List<Account> getAllAccounts () {
    return [SELECT Id, Name, Phone FROM Account];
  }

  public void updateAccounts() {
    List<Account> accounts = [SELECT Id, Name, Phone FROM Account];
    for (Account account : accounts) {
      account.Name = 'New Name';
    }

    update accounts;
  }
}