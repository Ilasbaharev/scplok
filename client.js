// ��������� ��������� �������� �������
Damage.GetContext().DamageOut.Value = GameMode.Parameters.GetBool("Damage");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool("PartialDesruction");
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool("LoosenBlocks");
Build.GetContext().FloodFill.Value = GameMode.Parameters.GetBool("FloodFill");
Build.GetContext().FillQuad.Value = GameMode.Parameters.GetBool("FillQuad");
Build.GetContext().RemoveQuad.Value = GameMode.Parameters.GetBool("RemoveQuad");
Build.GetContext().FlyEnable.Value = GameMode.Parameters.GetBool("Fly");

// ������ ��������� ������ ��� �����
BreackGraph.BreackAll = true;
// ���������� ���������� ������
Ui.GetContext().QuadsCount.Value = true;
// ��� ������������ �����
Build.GetContext().Pipette.Value = true;
Build.GetContext().BalkLenChange.Value = true;
Build.GetContext().SetSkyEnable.Value = true;
Build.GetContext().GenMapEnable.Value = true;
Build.GetContext().ChangeCameraPointsEnable.Value = true;
Build.GetContext().QuadChangeEnable.Value = true;
Build.GetContext().BuildModeEnable.Value = true;
Build.GetContext().CollapseChangeEnable.Value = true;
Build.GetContext().RenameMapEnable.Value = true;
Build.GetContext().ChangeMapAuthorsEnable.Value = true;
Build.GetContext().LoadMapEnable.Value = true;
Build.GetContext().ChangeSpawnsEnable.Value = true;

// ��������� ����
Properties.GetContext().GameModeName.Value = "GameModes/Peace";
// ������� �������
red = GameMode.Parameters.GetBool("RedTeam");
blue = GameMode.Parameters.GetBool("BlueTeam");
if (red || !red && !blue) {
	Teams.Add("Red", "Teams/Red", { r: 1 });
	Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
}
if (blue || !red && !blue) {
	Teams.Add("Blue", "Teams/Blue", { b: 1 });
	Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
	if(GameMode.Parameters.GetBool("BlueHasNothing")){
		var inventory = Inventory.GetContext();
		Teams.Get("Blue").Inventory.Main.Value = false;
		Teams.Get("Blue").Inventory.Secondary.Value = false;
		Teams.Get("Blue").Inventory.Melee.Value = false;
		Teams.Get("Blue").Inventory.Explosive.Value = false;
		Teams.Get("Blue").Inventory.Build.Value = false;
	}
}
Damage.OnDeath.Add(function(player) {
  ++player.Properties.Deaths.Value;
var prop = player.Properties;
var inv = player.inventory;
prop.Get("Crate").Value = 0;
player.Ui.Hint.Value = "ты погиб !"
inv.Main.Value = false;
inv.Melee.Value = false;
inv.Secondary.Value = false;
inv.Explosive.Value = false;
inv.Build.Value = false;
});
createArea(["пест"], {b: 3000}, true, true, "aView");

var aTrigger = AreaPlayerTriggerService.Get("aTrigger");
aTrigger.Tags = ["пест"];
aTrigger.Enable = true;
aTrigger.OnEnter.Add(function(player) {
player.Ui.Hint.Value = "ТЫ ВЗЯЛ ПЕСТ !"
var inv = player.inventory.Secondary;
inv.Value = true;
inv.Value = false;
inv.Value = true;
});
// ��������� ���� � ������� �� �������
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
// ����� �� ����� � �������
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// ������ ���������
Ui.getContext().Hint.Value = "Hint/BuildBase";

// ������������ ���������
var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = true;
inventory.Explosive.Value = false;
inventory.Build.Value = true;
inventory.BuildInfinity.Value = true;

// ��������� ��� ������ �����
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;

// ������������ �����
Spawns.GetContext().RespawnTime.Value = 0;