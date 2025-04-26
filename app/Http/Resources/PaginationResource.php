<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaginationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "lastPage" => $this->last_page,
            "currentPage" => $this->current_page,
            "from" => $this->from,
            "to" => $this->to,
            "total" => $this->total,
            "links" => $this->links,
            "lastPageUrl" => $this->last_page_url,
            "nextPageUrl" => $this->next_page_url,
            "prevPageUrl" => $this->prev_page_url
        ];
    }
}
