let mydata = [
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457366400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457367400, state: 2},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457368400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457360400, state: 0},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457361400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457362400, state: 2},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457363400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457364400, state: 0},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457365400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457376400, state: 2},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457378400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457345400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, state: 0},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457337400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457323400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457335400, state: 0},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457372400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457330400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457336400, state: 2},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457374400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457374400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457374400, state: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457398400, state: 1},
]

let mydata2 = [
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457366400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457367400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457368400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457360400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457361400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457362400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457363400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457364400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457365400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457376400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457378400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457345400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457337400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457323400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457335400, retransmission: 1},
	{region: "东城区2", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457372400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457330400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457336400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457374400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457398400, retransmission: 1},
]

let mydata3 = [
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457366400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457367400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457368400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457360400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457361400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457362400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457363400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457364400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457365400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457376400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457378400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457345400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457369400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457337400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457323400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457335400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457372400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457330400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457336400, retransmission: 1},
	{region: "东城区3", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457374400, retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, timestamp: 1457398400, retransmission: 1},
]

let mydata4 = [
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
	{"siteName": "站点1", "siteNumber": "001", subscribers: [{"name":"ab", "subscriberId":"id1"},{"name":"ab2", "subscriberId":"id2"}]},
]

let navs = [
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng1"},
	{"_id": "123", "name": "fds区", "regionCode": "dongcheng2"},
	{"_id": "123", "name": "gg区", "regionCode": "dongcheng3"},
	{"_id": "123", "name": "dfd区", "regionCode": "dongcheng4"},
	{"_id": "1e4", "name": "453区", "regionCode": "dongcheng34"},
	{"_id": "123", "name": "bg城区", "regionCode": "dongcheng43"},
	{"_id": "123", "name": "bfgd区", "regionCode": "dongcheng32"},
	{"_id": "123", "name": "adf区", "regionCode": "dongcheng54"},
	{"_id": "123", "name": "bgf区", "regionCode": "dongcheng75"},
	{"_id": "123", "name": "vx区", "regionCode": "dongcheng432"},
	{"_id": "123", "name": "re区", "regionCode": "dongcheng76"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng14"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng17"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng46"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng41"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng62"},
	{"_id": "123", "name": "东城区", "regionCode": "dongcheng434"},
]

let sites = [
	{"_id": "124", siteName: "站点1", siteNumber: '12uu3', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "423", siteName: "站点43", siteNumber: '12tre3', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "567", siteName: "站点5431", siteNumber: '12tr43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "342", siteName: "站点6542", siteNumber: '12443', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "767", siteName: "站点0987", siteNumber: '1gf443', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "472", siteName: "站点64", siteNumber: '1ng43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "843", siteName: "站点54", siteNumber: '124gfdf43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "357", siteName: "站点2777", siteNumber: '12443', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "603", siteName: "站点543", siteNumber: '12fsf43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "379", siteName: "站点366", siteNumber: '12443', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "233", siteName: "站点576", siteNumber: '12vfw3', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "456", siteName: "站点157", siteNumber: '12re3', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "239", siteName: "站点12", siteNumber: '1gr43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "537", siteName: "站点251", siteNumber: '1bf43', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "248", siteName: "站点176", siteNumber: '12ss3', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "555", siteName: "站点1543", siteNumber: '17543', regionId: "id1243", subscribers:["userid123"]},
	{"_id": "789", siteName: "站点154", siteNumber: '1244ng3', regionId: "id1243", subscribers:["userid123"]}
]

let allSubscribers = [
	{}
]

let partSubscribers = [
	{}
]

let subscribers = [
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
	{_id: "1334", name: "张1", phone: "139342"},
]

let allSites = [
	{_id: "1", siteName: "s1", siteNumber: "number342", "regionId": "region3"},
	{_id: "2", siteName: "s2", siteNumber: "number342", "regionId": "region3"},
	{_id: "3", siteName: "s3", siteNumber: "number342", "regionId": "region3"},
	{_id: "4", siteName: "s4", siteNumber: "number342", "regionId": "region3"},
	{_id: "5", siteName: "s5", siteNumber: "number342", "regionId": "region3"},
	{_id: "6", siteName: "s6", siteNumber: "number342", "regionId": "region3"},
	{_id: "7", siteName: "s72", siteNumber: "number342", "regionId": "region3"},
	{_id: "8", siteName: "s7", siteNumber: "number342", "regionId": "region3"},
	{_id: "9", siteName: "s9", siteNumber: "number342", "regionId": "region3"},
	{_id: "10", siteName: "s10", siteNumber: "number342", "regionId": "region3"},
	{_id: "11", siteName: "s11", siteNumber: "number342", "regionId": "region3"},
	{_id: "12", siteName: "s12", siteNumber: "number342", "regionId": "region3"},
	{_id: "13", siteName: "s13", siteNumber: "number342", "regionId": "region3"},
	{_id: "14", siteName: "s14", siteNumber: "number342", "regionId": "region3"}
]

let partSites = [
	{_id: "siteidre", siteName: "site3bbbbb2", siteNumber: "number342", "regionId": "region3"},
	{_id: "siteid43", siteName: "site3nnn2", siteNumber: "number342", "regionId": "region3"}
]

export {mydata, mydata2, mydata3, mydata4, navs, 
	sites, allSubscribers, partSubscribers, subscribers,
	allSites, partSites
}