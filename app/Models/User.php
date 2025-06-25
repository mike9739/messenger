<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'avatar',
        'email_verified_at',
        'is_admin',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function toConversationArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_group' => false,
            'is_user' => true,
            'is_admin' => (bool) $this->is_admin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'blocked_at' => $this->blocked_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date,
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'group_users');
    }

    public static function getMessagedUsers(User $user)
    {
        $userId = $user->id;
        $query = User::select(['users.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
            ->where('users.id', '<>', $userId)
            ->when(! $user->is_admin, function ($query) {
                $query->whereNull('users.blocked_at');
            })
            ->leftJoin('conversations', function ($join) use ($userId) {
                $join->on('conversations.sender_id', '=', 'users.id')
                    ->where('conversations.receiver_id', '=', $userId)
                    ->orWhere(function ($query) use ($userId) {
                        $query->on('conversations.receiver_id', '=', 'users.id')
                            ->where('conversations.sender_id', '=', $userId);
                    });
            })
            ->leftJoin('messages', 'messages.id', '=', 'conversations.last_message_id')
            ->orderByRaw('users.blocked_at NULLS FIRST')
            ->orderBy('messages.created_at', 'desc')
            ->orderBy('users.name');

        return $query->get();
    }
}
