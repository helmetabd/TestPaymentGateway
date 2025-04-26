<?php

namespace App\Helpers;

class FrontendSelect2Helper
{
    public static function convert(array $plucked_data){
        $r = collect();
        foreach ($plucked_data as $key => $value) {
            $r->push(['value' => $key, 'label' => $value]);
        }
        return $r;
    }

    public static function collection($collection, object $keys){
        $r = collect();
        foreach ($collection as $col) {
            $r->push(['value' => $col[$keys->value], 'label' => $col[$keys->text]]);
        }
        return $r;
    }
    public static function collectionPositionWithLevel($collection, object $keys){
        $r = collect();
        foreach ($collection as $col) {
            $r->push(['value' => $col[$keys->value], 'label' => "Lvl " .$col[$keys->level]. " - " .str($col[$keys->text])->title(), 'department' => $col[$keys->department]]);
        }
        return $r;
    }
}
