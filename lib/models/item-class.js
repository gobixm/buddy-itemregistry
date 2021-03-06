"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemClass;
(function (ItemClass) {
    ItemClass[ItemClass["Consumable"] = 0] = "Consumable";
    ItemClass[ItemClass["Container"] = 1] = "Container";
    ItemClass[ItemClass["Weapon"] = 2] = "Weapon";
    ItemClass[ItemClass["Gem"] = 3] = "Gem";
    ItemClass[ItemClass["Armor"] = 4] = "Armor";
    ItemClass[ItemClass["Class5"] = 5] = "Class5";
    ItemClass[ItemClass["Class6"] = 6] = "Class6";
    ItemClass[ItemClass["TradeGoods"] = 7] = "TradeGoods";
    ItemClass[ItemClass["Enchant"] = 8] = "Enchant";
    ItemClass[ItemClass["Receipt"] = 9] = "Receipt";
    ItemClass[ItemClass["Class10"] = 10] = "Class10";
    ItemClass[ItemClass["Class11"] = 11] = "Class11";
    ItemClass[ItemClass["Token"] = 12] = "Token";
    ItemClass[ItemClass["Key"] = 13] = "Key";
    ItemClass[ItemClass["Class14"] = 14] = "Class14";
    ItemClass[ItemClass["Misc"] = 15] = "Misc";
    ItemClass[ItemClass["Glyph"] = 16] = "Glyph";
})(ItemClass = exports.ItemClass || (exports.ItemClass = {}));
var ConsumableSubclass;
(function (ConsumableSubclass) {
    ConsumableSubclass[ConsumableSubclass["Consumable"] = 0] = "Consumable";
    ConsumableSubclass[ConsumableSubclass["Potion"] = 1] = "Potion";
    ConsumableSubclass[ConsumableSubclass["Elixir"] = 2] = "Elixir";
    ConsumableSubclass[ConsumableSubclass["Flasks"] = 3] = "Flasks";
    ConsumableSubclass[ConsumableSubclass["FoodDrink"] = 5] = "FoodDrink";
    ConsumableSubclass[ConsumableSubclass["Bandage"] = 7] = "Bandage";
    ConsumableSubclass[ConsumableSubclass["Other"] = 8] = "Other";
})(ConsumableSubclass = exports.ConsumableSubclass || (exports.ConsumableSubclass = {}));
var ContainerSubclass;
(function (ContainerSubclass) {
    ContainerSubclass[ContainerSubclass["Bag"] = 0] = "Bag";
    ContainerSubclass[ContainerSubclass["HerbBag"] = 2] = "HerbBag";
    ContainerSubclass[ContainerSubclass["EnchantingBag"] = 3] = "EnchantingBag";
    ContainerSubclass[ContainerSubclass["EngineeringBag"] = 4] = "EngineeringBag";
    ContainerSubclass[ContainerSubclass["GemBag"] = 5] = "GemBag";
    ContainerSubclass[ContainerSubclass["MiningBag"] = 6] = "MiningBag";
    ContainerSubclass[ContainerSubclass["LeatherworkingBag"] = 7] = "LeatherworkingBag";
    ContainerSubclass[ContainerSubclass["InscriptionBag"] = 8] = "InscriptionBag";
    ContainerSubclass[ContainerSubclass["TackleBox"] = 9] = "TackleBox";
})(ContainerSubclass = exports.ContainerSubclass || (exports.ContainerSubclass = {}));
var WeaponSubclass;
(function (WeaponSubclass) {
    WeaponSubclass[WeaponSubclass["OneHandedAxe"] = 0] = "OneHandedAxe";
    WeaponSubclass[WeaponSubclass["TwoHandedAxe"] = 1] = "TwoHandedAxe";
    WeaponSubclass[WeaponSubclass["Bow"] = 2] = "Bow";
    WeaponSubclass[WeaponSubclass["Gun"] = 3] = "Gun";
    WeaponSubclass[WeaponSubclass["OneHandedMace"] = 4] = "OneHandedMace";
    WeaponSubclass[WeaponSubclass["TwoHandedMace"] = 5] = "TwoHandedMace";
    WeaponSubclass[WeaponSubclass["Polearm"] = 6] = "Polearm";
    WeaponSubclass[WeaponSubclass["OneHandedSword"] = 7] = "OneHandedSword";
    WeaponSubclass[WeaponSubclass["TwoHandedSword"] = 8] = "TwoHandedSword";
    WeaponSubclass[WeaponSubclass["Staff"] = 10] = "Staff";
    WeaponSubclass[WeaponSubclass["Fist"] = 13] = "Fist";
    WeaponSubclass[WeaponSubclass["Miscellaneous"] = 14] = "Miscellaneous";
    WeaponSubclass[WeaponSubclass["Dagger"] = 15] = "Dagger";
    WeaponSubclass[WeaponSubclass["Crossbow"] = 18] = "Crossbow";
    WeaponSubclass[WeaponSubclass["Wand"] = 19] = "Wand";
})(WeaponSubclass = exports.WeaponSubclass || (exports.WeaponSubclass = {}));
var GemSubclass;
(function (GemSubclass) {
    GemSubclass[GemSubclass["RedInt"] = 0] = "RedInt";
    GemSubclass[GemSubclass["RedAgile"] = 1] = "RedAgile";
    GemSubclass[GemSubclass["RedStrength"] = 2] = "RedStrength";
    GemSubclass[GemSubclass["BlueStamina"] = 3] = "BlueStamina";
    GemSubclass[GemSubclass["YellowCrit"] = 5] = "YellowCrit";
    GemSubclass[GemSubclass["YellowMastery"] = 6] = "YellowMastery";
    GemSubclass[GemSubclass["PrismaticHaste"] = 7] = "PrismaticHaste";
    GemSubclass[GemSubclass["BlueVersatility"] = 8] = "BlueVersatility";
    GemSubclass[GemSubclass["Meta"] = 9] = "Meta";
    GemSubclass[GemSubclass["Purple"] = 10] = "Purple";
    GemSubclass[GemSubclass["Relic"] = 11] = "Relic";
})(GemSubclass = exports.GemSubclass || (exports.GemSubclass = {}));
var MaterialSubclass;
(function (MaterialSubclass) {
    MaterialSubclass[MaterialSubclass["Part"] = 1] = "Part";
    MaterialSubclass[MaterialSubclass["Jewelcrafting"] = 4] = "Jewelcrafting";
    MaterialSubclass[MaterialSubclass["Cloth"] = 5] = "Cloth";
    MaterialSubclass[MaterialSubclass["Leather"] = 6] = "Leather";
    MaterialSubclass[MaterialSubclass["MetalNStone"] = 7] = "MetalNStone";
    MaterialSubclass[MaterialSubclass["Meat"] = 8] = "Meat";
    MaterialSubclass[MaterialSubclass["Herb"] = 9] = "Herb";
    MaterialSubclass[MaterialSubclass["Elemental"] = 10] = "Elemental";
    MaterialSubclass[MaterialSubclass["Other"] = 11] = "Other";
    MaterialSubclass[MaterialSubclass["Enchanting"] = 12] = "Enchanting";
    MaterialSubclass[MaterialSubclass["Ink"] = 16] = "Ink";
})(MaterialSubclass = exports.MaterialSubclass || (exports.MaterialSubclass = {}));
var EnchantSubclass;
(function (EnchantSubclass) {
    EnchantSubclass[EnchantSubclass["EnhancementNeck"] = 1] = "EnhancementNeck";
    EnchantSubclass[EnchantSubclass["EnhancementShoulder"] = 2] = "EnhancementShoulder";
    EnchantSubclass[EnchantSubclass["EnhancementCloak"] = 3] = "EnhancementCloak";
    EnchantSubclass[EnchantSubclass["EnhancementChest"] = 4] = "EnhancementChest";
    EnchantSubclass[EnchantSubclass["EnhancementWrist"] = 5] = "EnhancementWrist";
    EnchantSubclass[EnchantSubclass["EnhancementHand"] = 6] = "EnhancementHand";
    EnchantSubclass[EnchantSubclass["BeltBuckle"] = 7] = "BeltBuckle";
    EnchantSubclass[EnchantSubclass["Thread"] = 8] = "Thread";
    EnchantSubclass[EnchantSubclass["EnhancementBoots"] = 9] = "EnhancementBoots";
    EnchantSubclass[EnchantSubclass["EnhancementRing"] = 10] = "EnhancementRing";
    EnchantSubclass[EnchantSubclass["EnhancementWeapon"] = 11] = "EnhancementWeapon";
    EnchantSubclass[EnchantSubclass["EnhancementTwoHandedWeapon"] = 12] = "EnhancementTwoHandedWeapon";
    EnchantSubclass[EnchantSubclass["EnhancementShield"] = 13] = "EnhancementShield";
    EnchantSubclass[EnchantSubclass["LeatherArmorKit"] = 14] = "LeatherArmorKit";
})(EnchantSubclass = exports.EnchantSubclass || (exports.EnchantSubclass = {}));
var ReceiptSubclass;
(function (ReceiptSubclass) {
    ReceiptSubclass[ReceiptSubclass["Book"] = 0] = "Book";
    ReceiptSubclass[ReceiptSubclass["Leatherworking"] = 1] = "Leatherworking";
    ReceiptSubclass[ReceiptSubclass["Tailoring"] = 2] = "Tailoring";
    ReceiptSubclass[ReceiptSubclass["Engineering"] = 3] = "Engineering";
    ReceiptSubclass[ReceiptSubclass["Blacksmithing"] = 4] = "Blacksmithing";
    ReceiptSubclass[ReceiptSubclass["Cooking"] = 5] = "Cooking";
    ReceiptSubclass[ReceiptSubclass["Alchemy"] = 6] = "Alchemy";
    ReceiptSubclass[ReceiptSubclass["Enchanting"] = 8] = "Enchanting";
    ReceiptSubclass[ReceiptSubclass["Jewelcrafting"] = 10] = "Jewelcrafting";
    ReceiptSubclass[ReceiptSubclass["Inscription"] = 11] = "Inscription";
})(ReceiptSubclass = exports.ReceiptSubclass || (exports.ReceiptSubclass = {}));
var MiscSubclass;
(function (MiscSubclass) {
    MiscSubclass[MiscSubclass["Junk"] = 0] = "Junk";
    MiscSubclass[MiscSubclass["Reagent"] = 1] = "Reagent";
    MiscSubclass[MiscSubclass["Companion"] = 2] = "Companion";
    MiscSubclass[MiscSubclass["Holiday"] = 3] = "Holiday";
    MiscSubclass[MiscSubclass["Other"] = 4] = "Other";
    MiscSubclass[MiscSubclass["Mount"] = 5] = "Mount";
})(MiscSubclass = exports.MiscSubclass || (exports.MiscSubclass = {}));
//# sourceMappingURL=item-class.js.map