<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait DisplayNameTrait
{
  protected function displayName(): Attribute
  {
    return Attribute::make(
      set: fn ($value) => [
        'name' => str($value)->slug('_'),
        'display_name' => $value
      ],
    );
  }
}
