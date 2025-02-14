package br.com.webbicho.server.shared.entities

import br.com.webbicho.server.shared.enums.EUserRole
import jakarta.persistence.*

@Entity(name = "users")
class User(
    @Column(
        nullable = false,
        unique = true,
        length = 30
    )
    var username: String,

    @Column
    var exibitionName: String? = null,

    @Column(length = 320)
    var email: String,

    @Column(columnDefinition = "TEXT")
    var about: String? = null,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var role: EUserRole = EUserRole.USER,

    @Column(columnDefinition = "TEXT")
    var avatar: String? = null,

    @OneToMany(
        mappedBy = "user",
        cascade = [CascadeType.REMOVE],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    var posts: MutableList<Post> = mutableListOf(),

    @OneToMany(
        mappedBy = "user",
        cascade = [CascadeType.REMOVE],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    var comments: MutableList<Comment> = mutableListOf()
) : WbEntity()
