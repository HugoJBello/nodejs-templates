const pointsArray2= require("./poly.json");

var polyline = require('@mapbox/polyline');
//var polyline = require( 'google-polyline' )



const polylineEncoded = polyline.fromGeoJSON(pointsArray2)
console.log("-----");
console.log(polylineEncoded);
const polylineEncodedPreURL = "((" + polylineEncoded + "))";
const urlEncoded =  encodeURIComponent(polylineEncodedPreURL)
//%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29

//gmm%7BxA%EE%83%9Bckx%60Cbzsu%40%7BeI~yz%40_blvGzivcBwtc~IzlihCofioFvbwfBg%60psKnhbvDwxlfLnwhbE_lbcN~cibEk%7B%7CvF~nowAwnnlKvbgbCcjun%40jtdKos%60g%40%7Bgzr%40snl%7BHzu%7Cu%40kdpiIz%7Co%5DktwwL_bfKkqriJ%7BdfhAsc~hEwp%60%7C%40sp%60pEwp%7CoBnzg%7CJj%7DztKzzkuWjvwsTvjjgTbn%60%60WcnkuAb%7Cg~Q%7BbqfB~ckxUwjqCfwo%5Df_mwHr%7DjqA~jryi%40vehvHjqhn%40befKjqxuJ~o%60_Azo%60%7DJra~u%40~b~zKzhui%40bgbEbnmtAjju~Dvjui%40jdnqCnbp%5DfcniCnio%5DzxksCvyo%5Dv~zaDfdjTnjigBro%60BfrtaC_ycHbw%7BhCk_cHr%7DfeCg%40rugaG~%7Bvl%40fq%60uOfpxiB~ww_Hrm%60%7C%40fjk%7BBbyo%5DbsvmAvkmZnv_uArdr%60%40bnmtAvoxo%40bl%7D~ArfjnAnc~p%40n%7Drc%40vqtgA~ywl%40zzkyAfoxl%40~v_p%40zdjTbdntBfkyo%40vlmnCnf~x%40bmet%40rwgNbk%7Du%40bleKnebuCfdjT~iucBzhiQzjqaA~rhQjkubAzdjTrelqAzkmW~yqt%40r~fNfxsRzp%60Br~fg%40S~hk%5C%7Bp%60BzyuH%3FzxgIotdHffzNspdK~%7DfN_fbB~nznDouhQbbhnMvhmWrdzpJb%7CfNjnthKbiq%60%40nsc%7CEfbmNbkmAorkyDc%60%40_w_rjAz%7CfFkwa_d%40jufFsofdv%40g%40gludBbnsgAcortD~cjqAw%7D~fEc%7Dg%60Ervl_A_eegIzeyqAgcryIjwrhAkjnoLr_hy%40klrgKfnrZoeaoJrpeHgxwxEouiN_suuE_dpWk%7Bn~Cwsv%60%40w%7CrvB%7BirZwrjxC%7Bf_m%40cu%7DeCg~zf%40cu%7DeCcsv%60%40s%60qaDs%7Dzf%40ghfrC_%60nTojugDgepWcowjDk_nTkx%7BpD%7BpgKs%7Cn~CsgcEcsymDkbaBgesdDbjcE_%60qaDnicEoqjxCfyiN%7BfbzDvgpW%7BfbzDrqt%5Dcpf%60Eb%60%7Bf%40cbyqAr%7CkQkbxbB~o_i%40
console.log(urlEncoded);

//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29
//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29

//https://www.idealista.com/en/areas/venta-viviendas/?shape=%60ntUk~%7BvF%40ALLLPFHrAtApAvA%7CAfBKNGNAP%3F%40TJXDN%3FLABAFFRVl%40t%40l%40pAx%40%7CALZ%3F%3FMRGVBL%3F%40HJLFT%40RATd%40x%40fBXn%40BL%40PNfAD%60A%3FNHz%40%40NDTDTPdABLF%7C%40BJpAq%40dBi%40dAS~AE%7CADHu%40Rs%40z%40iBx%40mAt%40aAt%40w%40~AoA%7CAuAhBsA%7BDi%40sEs%40sDnAkDDeBByAiCnBe%40t%40SOU%7DBkBwBkA_Bs%40_IaDkCeA%7DDn%40%3FF