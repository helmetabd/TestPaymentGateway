<?php
namespace App\Traits;

trait EnumToArrayTrait
{
    public static function toArray()
    {
        $e = self::cases();
        $a = array();
        foreach ($e as $x) {
            array_push($a, ['label' => $x->name, 'value' => $x->value]);
        }
        return $a;
    }
}