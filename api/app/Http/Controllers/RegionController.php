<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller {

    public function index(Request $request) {

        $regions = Region::orderBy('nom')->get();
        if ($regions->count() > 0) {
            return response()->json($regions);
        }
        
        $curl = curl_init("https://restcountries.com/v3.1/all");
        curl_setopt($curl, CURLOPT_CAINFO, storage_path('cert.cer'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($curl);
        
        if ($data === false) {
            return response()->json(curl_error($curl), 400);
        } else {
            $data = json_decode($data, true);
            foreach($data as $d) {
                $region = new Region();
                $region->nom = $d["name"]["common"];
                $region->code = strtolower($d["cca2"]);
                $code_appel = array_reduce($d["idd"], fn($carry, $item) => ( $carry .= is_array($item) ? $item[0] : $item ));
                $region->code_appel = $code_appel;
                $region->devise = key_exists("currencies", $d) ? key($d["currencies"]) : "USD";
                $region->flag = $d["flags"]["png"];
                $region->timezone = json_encode($d["timezones"]);
                $region->save();
            }
        }

        curl_close($curl);
    }
}