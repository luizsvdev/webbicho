package br.com.webbicho.server.shared.entities

import jakarta.persistence.*

@Entity(name = "comments")
class Comment(
    @Column(columnDefinition = "TEXT", nullable = false)
    var content: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uuid", nullable = false)
    var user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_uuid", nullable = false)
    var post: Post
) : WbEntity()
